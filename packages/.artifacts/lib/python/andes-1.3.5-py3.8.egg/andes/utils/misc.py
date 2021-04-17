import logging
from _pydecimal import Decimal, ROUND_DOWN
from time import time

logger = logging.getLogger(__name__)


def elapsed(t0=0.0):
    """
    Get the elapsed time from the give time.
    If the start time is not given, returns the unix-time.

    Returns
    -------
    t : float
        Elapsed time from the given time; Otherwise the epoch time.
    s : str
        The elapsed time in seconds in a string
    """
    t = time()
    dt = t - t0
    dt_sec = Decimal(str(dt)).quantize(Decimal('.0001'), rounding=ROUND_DOWN)
    if dt_sec == 1:
        s = str(dt_sec) + ' second'
    else:
        s = str(dt_sec) + ' seconds'
    return t, s


def to_number(s):
    """
    Convert a string to a number. If unsuccessful, return the de-blanked string.
    """
    ret = s

    # remove single quotes
    if "'" in ret:
        ret = ret.strip("'").strip()

    # try converting to booleans / None
    if ret == 'True':
        return True
    elif ret == 'False':
        return False
    elif ret == 'None':
        return None

    # try converting to float or int
    try:
        ret = int(ret)
    except ValueError:
        try:
            ret = float(ret)
        except ValueError:
            pass

    return ret


def is_notebook():
    try:
        shell = get_ipython().__class__.__name__
        if shell == 'ZMQInteractiveShell':
            return True   # Jupyter notebook or qt-console
        elif shell == 'TerminalInteractiveShell':
            return False  # Terminal running IPython
        else:
            return False  # Other type (?)
    except NameError:
        return False      # Probably standard Python interpreter


def is_interactive():
    """
    Check if is in an interactive shell (python or ipython).

    Returns
    -------
    bool

    """
    ipython = False
    try:
        cls_name = get_ipython().__class__.__name__

        if cls_name in ('InteractiveShellEmbed', 'TerminalInteractiveShell'):
            ipython = True
    except NameError:
        pass

    import __main__ as main

    return not hasattr(main, '__file__') or ipython
