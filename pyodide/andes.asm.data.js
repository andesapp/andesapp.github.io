
var Module = typeof Module !== 'undefined' ? Module : {};

Module.checkABI(1);

if (!Module.expectedDataFileDownloads) {
  Module.expectedDataFileDownloads = 0;
  Module.finishedDataFileDownloads = 0;
}
Module.expectedDataFileDownloads++;
(function() {
 var loadPackage = function(metadata) {

    var PACKAGE_PATH;
    if (typeof window === 'object') {
      PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
    } else if (typeof location !== 'undefined') {
      // worker
      PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
    } else {
      throw 'using preloaded data can only be done on a web page or in a web worker';
    }
    var PACKAGE_NAME = 'andes.asm.data';
    var REMOTE_PACKAGE_BASE = 'andes.asm.data';
    if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
      Module['locateFile'] = Module['locateFilePackage'];
      err('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
    }
    var REMOTE_PACKAGE_NAME = Module['locateFile'] ? Module['locateFile'](REMOTE_PACKAGE_BASE, '') : REMOTE_PACKAGE_BASE;
  
    var REMOTE_PACKAGE_SIZE = metadata.remote_package_size;
    var PACKAGE_UUID = metadata.package_uuid;
  
    function fetchRemotePackage(packageName, packageSize, callback, errback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', packageName, true);
      xhr.responseType = 'arraybuffer';
      xhr.onprogress = function(event) {
        var url = packageName;
        var size = packageSize;
        if (event.total) size = event.total;
        if (event.loaded) {
          if (!xhr.addedTotal) {
            xhr.addedTotal = true;
            if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
            Module.dataFileDownloads[url] = {
              loaded: event.loaded,
              total: size
            };
          } else {
            Module.dataFileDownloads[url].loaded = event.loaded;
          }
          var total = 0;
          var loaded = 0;
          var num = 0;
          for (var download in Module.dataFileDownloads) {
          var data = Module.dataFileDownloads[download];
            total += data.total;
            loaded += data.loaded;
            num++;
          }
          total = Math.ceil(total * Module.expectedDataFileDownloads/num);
          if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
        } else if (!Module.dataFileDownloads) {
          if (Module['setStatus']) Module['setStatus']('Downloading data...');
        }
      };
      xhr.onerror = function(event) {
        throw new Error("NetworkError for: " + packageName);
      }
      xhr.onload = function(event) {
        if (xhr.status == 200 || xhr.status == 304 || xhr.status == 206 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
          var packageData = xhr.response;
          callback(packageData);
        } else {
          throw new Error(xhr.statusText + " : " + xhr.responseURL);
        }
      };
      xhr.send(null);
    };

    function handleError(error) {
      console.error('package error:', error);
    };
  
      var fetchedCallback = null;
      var fetched = Module['getPreloadedPackage'] ? Module['getPreloadedPackage'](REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE) : null;

      if (!fetched) fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function(data) {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);
    
  function runWithFS() {

    function assert(check, msg) {
      if (!check) throw msg + new Error().stack;
    }
Module['FS_createPath']('/', 'home', true, true);
Module['FS_createPath']('/home', 'web_user', true, true);
Module['FS_createPath']('/home/web_user', '.andes', true, true);
Module['FS_createPath']('/home/web_user/.andes', 'pycode', true, true);

    function DataRequest(start, end, audio) {
      this.start = start;
      this.end = end;
      this.audio = audio;
    }
    DataRequest.prototype = {
      requests: {},
      open: function(mode, name) {
        this.name = name;
        this.requests[name] = this;
        Module['addRunDependency']('fp ' + this.name);
      },
      send: function() {},
      onload: function() {
        var byteArray = this.byteArray.subarray(this.start, this.end);
        this.finish(byteArray);
      },
      finish: function(byteArray) {
        var that = this;

        Module['FS_createDataFile'](this.name, null, byteArray, true, true, true); // canOwn this data in the filesystem, it is a slide into the heap that will never change
        Module['removeRunDependency']('fp ' + that.name);

        this.requests[this.name] = null;
      }
    };

        var files = metadata.files;
        for (var i = 0; i < files.length; ++i) {
          new DataRequest(files[i].start, files[i].end, files[i].audio).open('GET', files[i].filename);
        }

  
    function processPackageData(arrayBuffer) {
      Module.finishedDataFileDownloads++;
      assert(arrayBuffer, 'Loading data file failed.');
      assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
      var byteArray = new Uint8Array(arrayBuffer);
      var curr;
      
        // copy the entire loaded file into a spot in the heap. Files will refer to slices in that. They cannot be freed though
        // (we may be allocating before malloc is ready, during startup).
        var ptr = Module['getMemory'](byteArray.length);
        Module['HEAPU8'].set(byteArray, ptr);
        DataRequest.prototype.byteArray = Module['HEAPU8'].subarray(ptr, ptr+byteArray.length);
  
          var files = metadata.files;
          for (var i = 0; i < files.length; ++i) {
            DataRequest.prototype.requests[files[i].filename].onload();
          }
              Module['removeRunDependency']('datafile_andes.asm.data');

    };
    Module['addRunDependency']('datafile_andes.asm.data');
  
    if (!Module.preloadResults) Module.preloadResults = {};
  
      Module.preloadResults[PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }
    
  }
  if (Module['calledRun']) {
    runWithFS();
  } else {
    if (!Module['preRun']) Module['preRun'] = [];
    Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
  }

 }
 loadPackage({"files": [{"filename": "/home/web_user/.andes/calls.pkl", "start": 0, "end": 233632, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/Summary.py", "start": 233632, "end": 234810, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/L.py", "start": 234810, "end": 236261, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/EXAC4.py", "start": 236261, "end": 240318, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/TGOV1N.py", "start": 240318, "end": 243640, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/RCp.py", "start": 243640, "end": 245455, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/WTDS.py", "start": 245455, "end": 247531, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/Shunt.py", "start": 247531, "end": 248883, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/Fault.py", "start": 248883, "end": 250586, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/R.py", "start": 250586, "end": 252078, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/ESDC2A.py", "start": 252078, "end": 258131, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/Line.py", "start": 258131, "end": 262277, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/ESST4B.py", "start": 262277, "end": 270547, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/FLoad.py", "start": 270547, "end": 272340, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/IEEET1.py", "start": 272340, "end": 277182, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/ACE.py", "start": 277182, "end": 278619, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/IEEEST.py", "start": 278619, "end": 285507, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/C.py", "start": 285507, "end": 287169, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/GENROU.py", "start": 287169, "end": 301438, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/TGOV1DB.py", "start": 301438, "end": 305285, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/TestLagAWFreeze.py", "start": 305285, "end": 307459, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/WTPTA1.py", "start": 307459, "end": 311621, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/Area.py", "start": 311621, "end": 312799, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/Jumper.py", "start": 312799, "end": 314285, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/IEEEG1.py", "start": 314285, "end": 319947, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/ACEc.py", "start": 319947, "end": 321443, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/Slack.py", "start": 321443, "end": 323547, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/PI2.py", "start": 323547, "end": 325568, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/Ground.py", "start": 325568, "end": 326954, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/RLs.py", "start": 326954, "end": 328737, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/IEEEX1.py", "start": 328737, "end": 333991, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/TestPI.py", "start": 333991, "end": 339043, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/REGCA1.py", "start": 339043, "end": 346099, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/Bus.py", "start": 346099, "end": 347496, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/WTARA1.py", "start": 347496, "end": 349055, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/WTDTA1.py", "start": 349055, "end": 351746, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/WTARV1.py", "start": 351746, "end": 352938, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/Motor3.py", "start": 352938, "end": 358609, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/ShuntSw.py", "start": 358609, "end": 360142, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/VSCShunt.py", "start": 360142, "end": 365519, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/Toggler.py", "start": 365519, "end": 366739, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/RCs.py", "start": 366739, "end": 368489, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/GENCLS.py", "start": 368489, "end": 375621, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/SEXS.py", "start": 375621, "end": 378469, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/Motor5.py", "start": 378469, "end": 385312, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/ST2CUT.py", "start": 385312, "end": 394270, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/PQ.py", "start": 394270, "end": 397798, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/PMU.py", "start": 397798, "end": 399278, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/__init__.py", "start": 399278, "end": 401270, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/ESST3A.py", "start": 401270, "end": 409138, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/COI.py", "start": 409138, "end": 410947, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/WTTQA1.py", "start": 410947, "end": 416460, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/Alter.py", "start": 416460, "end": 417638, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/EXAC1.py", "start": 417638, "end": 424910, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/REPCA1.py", "start": 424910, "end": 436800, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/BusFreq.py", "start": 436800, "end": 438801, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/TG2.py", "start": 438801, "end": 442436, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/EXST1.py", "start": 442436, "end": 446865, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/FixedGen.py", "start": 446865, "end": 448091, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/RLCp.py", "start": 448091, "end": 449997, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/TestDB1.py", "start": 449997, "end": 451688, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/Node.py", "start": 451688, "end": 452978, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/IEESGO.py", "start": 452978, "end": 457221, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/EXDC2.py", "start": 457221, "end": 462360, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/PVD1.py", "start": 462360, "end": 476059, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/ZIP.py", "start": 476059, "end": 478762, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/RLCs.py", "start": 478762, "end": 480572, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/TGOV1.py", "start": 480572, "end": 483923, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/REECA1.py", "start": 483923, "end": 506847, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/PV.py", "start": 506847, "end": 508648, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/BusROCOF.py", "start": 508648, "end": 511002, "audio": 0}, {"filename": "/home/web_user/.andes/pycode/ESD1.py", "start": 511002, "end": 524945, "audio": 0}], "remote_package_size": 524945, "package_uuid": "10e4c3d4-0a27-40f5-bd4f-1ae3eff2be72"});

})();
