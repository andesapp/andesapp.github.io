"""
Module for power flow calculation.
"""

import logging
from collections import OrderedDict

from andes.utils.misc import elapsed
from andes.routines.base import BaseRoutine
from andes.variables.report import Report
from andes.shared import np, matrix, sparse, newton_krylov, IP_ADD

logger = logging.getLogger(__name__)


class PFlow(BaseRoutine):
    """
    Power flow calculation routine.
    """
    def __init__(self, system=None, config=None):
        super().__init__(system, config)
        self.config.add(OrderedDict((('tol', 1e-6),
                                     ('max_iter', 25),
                                     ('method', 'NR'),
                                     ('check_conn', 1),
                                     ('n_factorize', 4),
                                     ('report', 1),
                                     ('degree', 0),
                                     ('init_tds', 0),
                                     )))
        self.config.add_extra("_help",
                              tol="convergence tolerance",
                              max_iter="max. number of iterations",
                              method="calculation method",
                              check_conn='check connectivity before power flow',
                              n_factorize="first N iterations to factorize Jacobian in dishonest method",
                              report="write output report",
                              degree='use degree in report',
                              init_tds="initialize TDS after PFlow",
                              )
        self.config.add_extra("_alt",
                              tol="float",
                              method=("NR", "dishonest"),
                              check_conn=(0, 1),
                              max_iter=">=10",
                              n_factorize=">0",
                              report=(0, 1),
                              degree=(0, 1),
                              init_tds=(0, 1),
                              )

        self.converged = False
        self.inc = None
        self.A = None
        self.niter = None
        self.mis = [1]
        self.models = OrderedDict()

        self.x_sol = None
        self.y_sol = None

    def init(self):
        system = self.system

        self.models = system.find_models('pflow')
        self.converged = False
        self.inc = None
        self.A = None
        self.niter = None
        self.mis = [1]

        self.x_sol = None
        self.y_sol = None

        self.system.set_var_arrays(self.models, inplace=True, alloc=False)
        self.system.init(self.models, routine='pflow')
        logger.info('Power flow initialized.')

        # force precompile if numba is on - improves timing accuracy
        if system.config.numba:
            system.f_update(self.models)
            system.g_update(self.models)
            system.j_update(models=self.models)

        return system.dae.xy

    def nr_step(self):
        """
        Single step using Newton-Raphson method.

        Returns
        -------
        float
            maximum absolute mismatch
        """
        system = self.system
        # evaluate discrete, differential, algebraic, and Jacobians
        system.dae.clear_fg()
        system.l_update_var(self.models, niter=self.niter, err=self.mis[-1])
        system.s_update_var(self.models)
        system.f_update(self.models)
        system.g_update(self.models)
        system.l_update_eq(self.models)
        system.fg_to_dae()

        if self.config.method == 'NR':
            system.j_update(models=self.models)
        elif self.config.method == 'dishonest':
            if self.niter < self.config.n_factorize:
                system.j_update(self.models)

        # prepare and solve linear equations
        self.inc = -matrix([matrix(system.dae.f),
                            matrix(system.dae.g)])

        self.A = sparse([[system.dae.fx, system.dae.gx],
                         [system.dae.fy, system.dae.gy]])

        if not self.config.linsolve:
            self.inc = self.solver.solve(self.A, self.inc)
        else:
            self.inc = self.solver.linsolve(self.A, self.inc)

        system.dae.x += np.ravel(np.array(self.inc[:system.dae.n]))
        system.dae.y += np.ravel(np.array(self.inc[system.dae.n:]))

        # find out variables associated with maximum mismatches
        fmax = 0
        if system.dae.n > 0:
            fmax_idx = np.argmax(np.abs(system.dae.f))
            fmax = system.dae.f[fmax_idx]
            logger.debug("Max. diff mismatch %.10g on %s", fmax, system.dae.x_name[fmax_idx])

        gmax_idx = np.argmax(np.abs(system.dae.g))
        gmax = system.dae.g[gmax_idx]
        logger.debug("Max. algeb mismatch %.10g on %s", gmax, system.dae.y_name[gmax_idx])

        mis = max(abs(fmax), abs(gmax))
        if self.niter == 0:
            self.mis[0] = mis
        else:
            self.mis.append(mis)

        system.vars_to_models()

        return mis

    def summary(self):
        """
        Output a summary for the PFlow routine.
        """
        ipadd_status = 'Standard (ipadd not available)'

        # extract package name, `kvxopt` or `kvxopt`
        sp_module = sparse.__module__
        if '.' in sp_module:
            sp_module = sp_module.split('.')[0]

        if IP_ADD:
            if self.system.config.ipadd:
                ipadd_status = f'Fast in-place ({sp_module})'
            else:
                ipadd_status = 'Standard (ipadd disabled in config)'

        out = list()
        out.append('')
        out.append('-> Power flow calculation')
        out.append(f'{"Sparse solver":>16s}: {self.solver.sparselib.upper()}')
        out.append(f'{"Solution method":>16s}: {self.config.method} method')
        out.append(f'{"Sparse addition":>16s}: {ipadd_status}')
        out_str = '\n'.join(out)
        logger.info(out_str)

    def run(self, **kwargs):
        """
        Full Newton-Raphson method.

        Returns
        -------
        bool
            convergence status
        """
        system = self.system
        if self.config.check_conn == 1:
            self.system.connectivity()

        self.summary()
        self.init()

        if system.dae.m == 0:
            logger.error("Loaded case contains no power flow element.")
            system.exit_code = 1
            return False

        t0, _ = elapsed()
        self.niter = 0
        while True:
            mis = self.nr_step()
            logger.info('%d: |F(x)| = %.10g', self.niter, mis)

            if mis < self.config.tol:
                self.converged = True
                break
            if self.niter > self.config.max_iter:
                break
            if np.isnan(mis).any():
                logger.error('NaN found in solution. Convergence not likely')
                self.niter = self.config.max_iter + 1
                break
            if mis > 1e4 * self.mis[0]:
                logger.error('Mismatch increased too fast. Convergence not likely.')
                break
            self.niter += 1

        _, s1 = elapsed(t0)

        if not self.converged:
            if abs(self.mis[-1] - self.mis[-2]) < self.config.tol:
                max_idx = np.argmax(np.abs(system.dae.xy))
                name = system.dae.xy_name[max_idx]
                logger.error('Mismatch is not correctable possibly due to large load-generation imbalance.')
                logger.error('Largest mismatch on equation associated with <%s>', name)
            else:
                logger.error('Power flow failed after %d iterations for "%s".', self.niter + 1, system.files.case)

        else:
            logger.info('Converged in %d iterations in %s.', self.niter + 1, s1)

            # make a copy of power flow solutions
            self.x_sol = system.dae.x.copy()
            self.y_sol = system.dae.y.copy()

            if self.config.init_tds:
                system.TDS.init()
            if self.config.report:
                system.PFlow.report()

        system.exit_code = 0 if self.converged else 1
        return self.converged

    def report(self):
        """
        Write power flow report to text file.
        """
        if self.system.files.no_output is False:
            r = Report(self.system)
            r.write()

    def _fg_wrapper(self, xy):
        """
        Wrapper for algebraic equations to be used with Newton-Krylov general solver

        Parameters
        ----------
        xy

        Returns
        -------

        """
        system = self.system
        system.dae.x[:] = xy[:system.dae.n]
        system.dae.y[:] = xy[system.dae.n:]
        system.vars_to_models()

        system.dae.clear_fg()
        system.l_update_var(self.models, niter=self.niter, err=self.mis[-1])
        system.f_update(self.models)
        system.g_update(self.models)
        system.l_update_eq(self.models)
        system.fg_to_dae()

        return system.dae.fg

    def newton_krylov(self, verbose=False):
        """
        Full Newton-Krylov method from SciPy.

        Warnings
        --------
        The result might be wrong if discrete are in use!

        Parameters
        ----------
        verbose
            True if verbose.

        Returns
        -------
        np.array
            Solutions `dae.xy`.
        """
        system = self.system
        system.init(system.exist.pflow)
        v0 = system.dae.xy
        try:
            ret = newton_krylov(self._fg_wrapper, v0, verbose=verbose)
        except ValueError as e:
            logger.error('Mismatch is not correctable. Equations may be unsolvable.')
            raise e

        return ret
