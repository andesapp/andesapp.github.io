var Module=typeof pyodide._module!=="undefined"?pyodide._module:{};Module.checkABI(1);if(!Module.expectedDataFileDownloads){Module.expectedDataFileDownloads=0;Module.finishedDataFileDownloads=0}Module.expectedDataFileDownloads++;(function(){var loadPackage=function(metadata){var PACKAGE_PATH;if(typeof window==="object"){PACKAGE_PATH=window["encodeURIComponent"](window.location.pathname.toString().substring(0,window.location.pathname.toString().lastIndexOf("/"))+"/")}else if(typeof location!=="undefined"){PACKAGE_PATH=encodeURIComponent(location.pathname.toString().substring(0,location.pathname.toString().lastIndexOf("/"))+"/")}else{throw"using preloaded data can only be done on a web page or in a web worker"}var PACKAGE_NAME="distlib.data";var REMOTE_PACKAGE_BASE="distlib.data";if(typeof Module["locateFilePackage"]==="function"&&!Module["locateFile"]){Module["locateFile"]=Module["locateFilePackage"];err("warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)")}var REMOTE_PACKAGE_NAME=Module["locateFile"]?Module["locateFile"](REMOTE_PACKAGE_BASE,""):REMOTE_PACKAGE_BASE;var REMOTE_PACKAGE_SIZE=metadata.remote_package_size;var PACKAGE_UUID=metadata.package_uuid;function fetchRemotePackage(packageName,packageSize,callback,errback){var xhr=new XMLHttpRequest;xhr.open("GET",packageName,true);xhr.responseType="arraybuffer";xhr.onprogress=function(event){var url=packageName;var size=packageSize;if(event.total)size=event.total;if(event.loaded){if(!xhr.addedTotal){xhr.addedTotal=true;if(!Module.dataFileDownloads)Module.dataFileDownloads={};Module.dataFileDownloads[url]={loaded:event.loaded,total:size}}else{Module.dataFileDownloads[url].loaded=event.loaded}var total=0;var loaded=0;var num=0;for(var download in Module.dataFileDownloads){var data=Module.dataFileDownloads[download];total+=data.total;loaded+=data.loaded;num++}total=Math.ceil(total*Module.expectedDataFileDownloads/num);if(Module["setStatus"])Module["setStatus"]("Downloading data... ("+loaded+"/"+total+")")}else if(!Module.dataFileDownloads){if(Module["setStatus"])Module["setStatus"]("Downloading data...")}};xhr.onerror=function(event){throw new Error("NetworkError for: "+packageName)};xhr.onload=function(event){if(xhr.status==200||xhr.status==304||xhr.status==206||xhr.status==0&&xhr.response){var packageData=xhr.response;callback(packageData)}else{throw new Error(xhr.statusText+" : "+xhr.responseURL)}};xhr.send(null)}function handleError(error){console.error("package error:",error)}var fetchedCallback=null;var fetched=Module["getPreloadedPackage"]?Module["getPreloadedPackage"](REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE):null;if(!fetched)fetchRemotePackage(REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE,function(data){if(fetchedCallback){fetchedCallback(data);fetchedCallback=null}else{fetched=data}},handleError);function runWithFS(){function assert(check,msg){if(!check)throw msg+(new Error).stack}Module["FS_createPath"]("/","lib",true,true);Module["FS_createPath"]("/lib","python3.8",true,true);Module["FS_createPath"]("/lib/python3.8","site-packages",true,true);Module["FS_createPath"]("/lib/python3.8/site-packages","distlib",true,true);Module["FS_createPath"]("/lib/python3.8/site-packages/distlib","_backport",true,true);function DataRequest(start,end,audio){this.start=start;this.end=end;this.audio=audio}DataRequest.prototype={requests:{},open:function(mode,name){this.name=name;this.requests[name]=this;Module["addRunDependency"]("fp "+this.name)},send:function(){},onload:function(){var byteArray=this.byteArray.subarray(this.start,this.end);this.finish(byteArray)},finish:function(byteArray){var that=this;Module["FS_createPreloadedFile"](this.name,null,byteArray,true,true,function(){Module["removeRunDependency"]("fp "+that.name)},function(){if(that.audio){Module["removeRunDependency"]("fp "+that.name)}else{err("Preloading file "+that.name+" failed")}},false,true);this.requests[this.name]=null}};function processPackageData(arrayBuffer){Module.finishedDataFileDownloads++;assert(arrayBuffer,"Loading data file failed.");assert(arrayBuffer instanceof ArrayBuffer,"bad input to processPackageData");var byteArray=new Uint8Array(arrayBuffer);var curr;var compressedData={data:null,cachedOffset:588711,cachedIndexes:[-1,-1],cachedChunks:[null,null],offsets:[0,1250,2166,3369,4246,5667,6798,8002,9168,10094,11243,12424,13718,14761,15614,16577,17610,18620,19737,20754,21959,22972,24121,25355,26704,27450,28312,29549,30942,32151,33308,34419,35798,37108,38391,39657,40957,42083,43268,44310,45373,46617,47604,48943,49962,50961,52006,53154,54120,54880,55880,56809,58180,59212,60104,61089,62047,63308,64479,65797,67039,68119,69114,70305,71395,72749,74065,75325,76553,77647,78721,79766,80838,82013,83164,84310,85472,86657,87827,88985,90165,91475,92685,93771,94945,95969,97099,98380,99446,100621,101923,103144,104135,105337,106514,107757,108853,110177,111251,112438,113540,114836,115759,116943,118206,119327,120527,122256,124056,125893,127702,129548,131404,133134,134979,136707,138585,140348,141999,143807,145663,147414,149183,150878,152545,154138,155889,157612,159437,161271,162813,163942,164788,165995,166934,168449,168874,169629,170823,172531,174052,175387,176843,178201,179400,180491,182017,183364,184915,186130,186745,188514,190336,192191,194043,195881,197741,199558,201381,203195,204862,206670,208389,210305,212065,213897,215762,217571,219345,221164,222979,224758,226341,227898,229700,231411,233312,235087,236984,238831,239820,241171,242148,242764,244200,245725,247205,248126,248810,249304,251103,252449,254182,255863,257067,258467,259865,261110,262116,263645,264927,266142,267459,268662,269640,270507,271630,272783,273713,275149,276231,277397,278989,280783,282581,284457,286265,288106,289915,291634,293457,295226,297114,298881,300702,302499,304300,306089,307831,309673,311496,313049,314762,316598,318318,320062,321949,323791,325009,326078,327374,327903,329272,330799,332254,333240,333708,334428,336146,337454,339193,340901,342117,343439,344872,346164,347069,348566,349835,351242,352234,353387,354440,355496,356567,357987,359357,360658,361774,362975,364077,365151,366322,367460,368755,369898,370984,372020,373199,374412,375493,376765,378065,379246,380106,381097,381911,382950,384004,385070,386257,387393,388362,389518,390711,392468,394264,396139,397935,399767,401555,403199,405038,406752,408513,410354,412173,413868,415625,417248,419054,420932,422690,424467,426124,427899,429592,431286,432894,434681,436554,437935,439256,440217,441195,442185,443721,444241,444958,446020,447793,449357,450632,452056,453463,454672,455734,457272,458592,460098,461702,462368,463840,465185,466301,467580,468561,469628,470805,472013,473154,474312,475710,477021,478238,479329,480632,481735,482776,484028,485078,486093,487201,488350,489490,490676,491613,493079,494191,495427,496624,497723,498917,500068,501305,502462,503575,504970,505456,507025,508231,509295,510542,511841,512827,514063,515175,516294,517280,518428,519575,520694,521676,522878,523933,524998,526109,527392,528634,529833,531044,532169,533499,534538,535538,536725,537918,538950,540050,541026,541954,543144,544334,545374,546532,547786,548922,550068,551101,552157,553120,554020,555171,556427,557611,558848,560042,561391,562310,563499,564714,565959,567220,568240,569639,570979,572017,573421,574665,575860,577202,578434,579762,580998,582294,583487,584775,586052,587346,588589],sizes:[1250,916,1203,877,1421,1131,1204,1166,926,1149,1181,1294,1043,853,963,1033,1010,1117,1017,1205,1013,1149,1234,1349,746,862,1237,1393,1209,1157,1111,1379,1310,1283,1266,1300,1126,1185,1042,1063,1244,987,1339,1019,999,1045,1148,966,760,1e3,929,1371,1032,892,985,958,1261,1171,1318,1242,1080,995,1191,1090,1354,1316,1260,1228,1094,1074,1045,1072,1175,1151,1146,1162,1185,1170,1158,1180,1310,1210,1086,1174,1024,1130,1281,1066,1175,1302,1221,991,1202,1177,1243,1096,1324,1074,1187,1102,1296,923,1184,1263,1121,1200,1729,1800,1837,1809,1846,1856,1730,1845,1728,1878,1763,1651,1808,1856,1751,1769,1695,1667,1593,1751,1723,1825,1834,1542,1129,846,1207,939,1515,425,755,1194,1708,1521,1335,1456,1358,1199,1091,1526,1347,1551,1215,615,1769,1822,1855,1852,1838,1860,1817,1823,1814,1667,1808,1719,1916,1760,1832,1865,1809,1774,1819,1815,1779,1583,1557,1802,1711,1901,1775,1897,1847,989,1351,977,616,1436,1525,1480,921,684,494,1799,1346,1733,1681,1204,1400,1398,1245,1006,1529,1282,1215,1317,1203,978,867,1123,1153,930,1436,1082,1166,1592,1794,1798,1876,1808,1841,1809,1719,1823,1769,1888,1767,1821,1797,1801,1789,1742,1842,1823,1553,1713,1836,1720,1744,1887,1842,1218,1069,1296,529,1369,1527,1455,986,468,720,1718,1308,1739,1708,1216,1322,1433,1292,905,1497,1269,1407,992,1153,1053,1056,1071,1420,1370,1301,1116,1201,1102,1074,1171,1138,1295,1143,1086,1036,1179,1213,1081,1272,1300,1181,860,991,814,1039,1054,1066,1187,1136,969,1156,1193,1757,1796,1875,1796,1832,1788,1644,1839,1714,1761,1841,1819,1695,1757,1623,1806,1878,1758,1777,1657,1775,1693,1694,1608,1787,1873,1381,1321,961,978,990,1536,520,717,1062,1773,1564,1275,1424,1407,1209,1062,1538,1320,1506,1604,666,1472,1345,1116,1279,981,1067,1177,1208,1141,1158,1398,1311,1217,1091,1303,1103,1041,1252,1050,1015,1108,1149,1140,1186,937,1466,1112,1236,1197,1099,1194,1151,1237,1157,1113,1395,486,1569,1206,1064,1247,1299,986,1236,1112,1119,986,1148,1147,1119,982,1202,1055,1065,1111,1283,1242,1199,1211,1125,1330,1039,1e3,1187,1193,1032,1100,976,928,1190,1190,1040,1158,1254,1136,1146,1033,1056,963,900,1151,1256,1184,1237,1194,1349,919,1189,1215,1245,1261,1020,1399,1340,1038,1404,1244,1195,1342,1232,1328,1236,1296,1193,1288,1277,1294,1243,122],successes:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]};compressedData.data=byteArray;assert(typeof Module.LZ4==="object","LZ4 not present - was your app build with  -s LZ4=1  ?");Module.LZ4.loadPackage({metadata:metadata,compressedData:compressedData});Module["removeRunDependency"]("datafile_distlib.data")}Module["addRunDependency"]("datafile_distlib.data");if(!Module.preloadResults)Module.preloadResults={};Module.preloadResults[PACKAGE_NAME]={fromCache:false};if(fetched){processPackageData(fetched);fetched=null}else{fetchedCallback=processPackageData}}if(Module["calledRun"]){runWithFS()}else{if(!Module["preRun"])Module["preRun"]=[];Module["preRun"].push(runWithFS)}};loadPackage({files:[{filename:"/lib/python3.8/site-packages/distlib-0.3.1-py3.8.egg-info",start:0,end:1261,audio:0},{filename:"/lib/python3.8/site-packages/distlib/metadata.py",start:1261,end:40223,audio:0},{filename:"/lib/python3.8/site-packages/distlib/version.py",start:40223,end:63614,audio:0},{filename:"/lib/python3.8/site-packages/distlib/compat.py",start:63614,end:105022,audio:0},{filename:"/lib/python3.8/site-packages/distlib/util.py",start:105022,end:164867,audio:0},{filename:"/lib/python3.8/site-packages/distlib/database.py",start:164867,end:215926,audio:0},{filename:"/lib/python3.8/site-packages/distlib/w32.exe",start:215926,end:306038,audio:0},{filename:"/lib/python3.8/site-packages/distlib/t64.exe",start:306038,end:412022,audio:0},{filename:"/lib/python3.8/site-packages/distlib/manifest.py",start:412022,end:426833,audio:0},{filename:"/lib/python3.8/site-packages/distlib/markers.py",start:426833,end:431220,audio:0},{filename:"/lib/python3.8/site-packages/distlib/w64.exe",start:431220,end:531060,audio:0},{filename:"/lib/python3.8/site-packages/distlib/resources.py",start:531060,end:541826,audio:0},{filename:"/lib/python3.8/site-packages/distlib/scripts.py",start:541826,end:559006,audio:0},{filename:"/lib/python3.8/site-packages/distlib/__init__.py",start:559006,end:559587,audio:0},{filename:"/lib/python3.8/site-packages/distlib/wheel.py",start:559587,end:600731,audio:0},{filename:"/lib/python3.8/site-packages/distlib/t32.exe",start:600731,end:697499,audio:0},{filename:"/lib/python3.8/site-packages/distlib/locators.py",start:697499,end:749599,audio:0},{filename:"/lib/python3.8/site-packages/distlib/index.py",start:749599,end:770665,audio:0},{filename:"/lib/python3.8/site-packages/distlib/_backport/misc.py",start:770665,end:771636,audio:0},{filename:"/lib/python3.8/site-packages/distlib/_backport/sysconfig.cfg",start:771636,end:774253,audio:0},{filename:"/lib/python3.8/site-packages/distlib/_backport/tarfile.py",start:774253,end:866881,audio:0},{filename:"/lib/python3.8/site-packages/distlib/_backport/sysconfig.py",start:866881,end:893735,audio:0},{filename:"/lib/python3.8/site-packages/distlib/_backport/__init__.py",start:893735,end:894009,audio:0},{filename:"/lib/python3.8/site-packages/distlib/_backport/shutil.py",start:894009,end:919716,audio:0}],remote_package_size:592807,package_uuid:"21d09d46-e0e9-462b-91e6-1e99604ba81d"})})();