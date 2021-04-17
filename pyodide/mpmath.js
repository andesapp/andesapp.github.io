var Module=typeof pyodide._module!=="undefined"?pyodide._module:{};Module.checkABI(1);if(!Module.expectedDataFileDownloads){Module.expectedDataFileDownloads=0;Module.finishedDataFileDownloads=0}Module.expectedDataFileDownloads++;(function(){var loadPackage=function(metadata){var PACKAGE_PATH;if(typeof window==="object"){PACKAGE_PATH=window["encodeURIComponent"](window.location.pathname.toString().substring(0,window.location.pathname.toString().lastIndexOf("/"))+"/")}else if(typeof location!=="undefined"){PACKAGE_PATH=encodeURIComponent(location.pathname.toString().substring(0,location.pathname.toString().lastIndexOf("/"))+"/")}else{throw"using preloaded data can only be done on a web page or in a web worker"}var PACKAGE_NAME="mpmath.data";var REMOTE_PACKAGE_BASE="mpmath.data";if(typeof Module["locateFilePackage"]==="function"&&!Module["locateFile"]){Module["locateFile"]=Module["locateFilePackage"];err("warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)")}var REMOTE_PACKAGE_NAME=Module["locateFile"]?Module["locateFile"](REMOTE_PACKAGE_BASE,""):REMOTE_PACKAGE_BASE;var REMOTE_PACKAGE_SIZE=metadata.remote_package_size;var PACKAGE_UUID=metadata.package_uuid;function fetchRemotePackage(packageName,packageSize,callback,errback){var xhr=new XMLHttpRequest;xhr.open("GET",packageName,true);xhr.responseType="arraybuffer";xhr.onprogress=function(event){var url=packageName;var size=packageSize;if(event.total)size=event.total;if(event.loaded){if(!xhr.addedTotal){xhr.addedTotal=true;if(!Module.dataFileDownloads)Module.dataFileDownloads={};Module.dataFileDownloads[url]={loaded:event.loaded,total:size}}else{Module.dataFileDownloads[url].loaded=event.loaded}var total=0;var loaded=0;var num=0;for(var download in Module.dataFileDownloads){var data=Module.dataFileDownloads[download];total+=data.total;loaded+=data.loaded;num++}total=Math.ceil(total*Module.expectedDataFileDownloads/num);if(Module["setStatus"])Module["setStatus"]("Downloading data... ("+loaded+"/"+total+")")}else if(!Module.dataFileDownloads){if(Module["setStatus"])Module["setStatus"]("Downloading data...")}};xhr.onerror=function(event){throw new Error("NetworkError for: "+packageName)};xhr.onload=function(event){if(xhr.status==200||xhr.status==304||xhr.status==206||xhr.status==0&&xhr.response){var packageData=xhr.response;callback(packageData)}else{throw new Error(xhr.statusText+" : "+xhr.responseURL)}};xhr.send(null)}function handleError(error){console.error("package error:",error)}var fetchedCallback=null;var fetched=Module["getPreloadedPackage"]?Module["getPreloadedPackage"](REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE):null;if(!fetched)fetchRemotePackage(REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE,function(data){if(fetchedCallback){fetchedCallback(data);fetchedCallback=null}else{fetched=data}},handleError);function runWithFS(){function assert(check,msg){if(!check)throw msg+(new Error).stack}Module["FS_createPath"]("/","lib",true,true);Module["FS_createPath"]("/lib","python3.8",true,true);Module["FS_createPath"]("/lib/python3.8","site-packages",true,true);Module["FS_createPath"]("/lib/python3.8/site-packages","mpmath",true,true);Module["FS_createPath"]("/lib/python3.8/site-packages/mpmath","functions",true,true);Module["FS_createPath"]("/lib/python3.8/site-packages/mpmath","calculus",true,true);Module["FS_createPath"]("/lib/python3.8/site-packages/mpmath","matrices",true,true);Module["FS_createPath"]("/lib/python3.8/site-packages/mpmath","libmp",true,true);Module["FS_createPath"]("/lib/python3.8/site-packages/mpmath","tests",true,true);function DataRequest(start,end,audio){this.start=start;this.end=end;this.audio=audio}DataRequest.prototype={requests:{},open:function(mode,name){this.name=name;this.requests[name]=this;Module["addRunDependency"]("fp "+this.name)},send:function(){},onload:function(){var byteArray=this.byteArray.subarray(this.start,this.end);this.finish(byteArray)},finish:function(byteArray){var that=this;Module["FS_createPreloadedFile"](this.name,null,byteArray,true,true,function(){Module["removeRunDependency"]("fp "+that.name)},function(){if(that.audio){Module["removeRunDependency"]("fp "+that.name)}else{err("Preloading file "+that.name+" failed")}},false,true);this.requests[this.name]=null}};function processPackageData(arrayBuffer){Module.finishedDataFileDownloads++;assert(arrayBuffer,"Loading data file failed.");assert(arrayBuffer instanceof ArrayBuffer,"bad input to processPackageData");var byteArray=new Uint8Array(arrayBuffer);var curr;var compressedData={data:null,cachedOffset:1105795,cachedIndexes:[-1,-1],cachedChunks:[null,null],offsets:[0,1315,2279,3221,4102,5132,5996,6997,7988,9555,10980,12312,13459,14964,16354,17722,19107,20256,21491,22631,24141,25475,26576,27687,28907,30129,31185,32400,34032,35432,36557,37937,39238,40557,41956,43488,45020,46554,48048,49461,50963,52180,53587,54986,56129,57605,59037,60560,61996,63411,64969,66500,67739,69200,70620,72027,73527,74969,76373,77760,79148,80440,81713,83089,84515,85902,87268,88478,89681,91146,92504,93793,95298,96501,97725,99082,100476,102026,103427,104816,106211,107716,109008,110413,111879,113053,114539,115910,117256,118515,119920,121156,122599,124004,125573,127075,128454,129760,131075,132508,133918,135379,136991,138413,139979,141371,142722,144207,145703,147136,148516,149759,150834,152252,153558,154919,156310,157649,158976,160427,161792,163162,164446,165773,167201,168480,169800,171133,172447,173833,175249,176774,178170,179639,181080,182523,183807,185001,186370,187609,188954,190308,191516,192838,194276,195520,196996,198221,199698,200817,202048,203494,204855,206126,207074,208485,209760,211175,212478,213751,214900,215833,217093,218259,219396,220472,221117,222366,223671,224693,225725,226867,227917,229304,230425,231566,233257,234644,235749,236953,238402,239800,240969,242186,243035,243913,244922,245663,246903,247835,248278,249082,250220,251237,252114,253255,254128,255218,256310,257391,258477,259925,260928,261694,262268,263124,263944,264887,265936,266860,268188,269250,270371,271492,272601,273762,274795,275980,277021,278155,279224,280348,281337,282518,283669,284882,286118,287402,288669,289890,291188,292542,293652,294718,296004,296762,297274,298711,299788,300991,302119,303183,304514,305712,306917,308428,309771,310926,312056,313185,314333,315484,316761,317592,318545,319381,320333,321220,322143,323175,324209,325022,325862,326907,327822,328756,329784,330598,331634,332333,333067,334146,335205,336419,337637,338551,339721,340859,342092,343134,344140,345011,346172,347284,348308,349354,350347,351486,352569,353835,355101,356416,357607,358912,360205,361375,362383,364179,365521,366659,367937,369058,370029,371092,372444,373809,374864,375923,377343,378672,380013,381316,382707,383995,385452,386590,387793,388989,390256,391667,392733,393765,394553,395396,396571,398007,399378,400775,401885,402890,404193,405470,406677,407878,409055,410440,411457,412346,413491,414757,416002,417240,418521,419671,421068,422321,423528,424808,426125,427496,428747,430051,431276,432293,433519,434611,435858,437350,438584,439881,441248,442209,443013,444222,445374,446391,447652,448930,450238,451496,452617,453729,454594,455642,456547,457553,458876,460175,461660,462797,463797,464997,466197,467322,468453,469671,470675,471900,472831,474056,475144,476105,477249,478347,479704,480853,482204,483191,484335,485335,486384,487389,488615,490022,491607,493085,494425,495696,497080,498263,499353,500688,501778,502631,503455,504806,505931,507165,508513,510063,511243,512410,513385,514437,515935,517334,518716,519845,521167,522342,523556,524741,526003,527026,528427,529559,530976,532447,533842,535262,536764,538184,539539,540771,542093,543442,544656,545986,547345,548582,549898,551178,552567,553964,555288,556646,558011,558999,560382,561795,563060,564371,565517,566821,568150,569415,570705,572094,573348,574884,576212,577617,578921,579964,581115,582300,583531,584733,586064,587239,588670,590037,591487,592851,594116,595172,596511,597572,598864,599980,601127,602448,603630,605165,606485,607945,609309,610668,611987,613131,614374,615516,616356,617721,618955,620236,621411,622763,624233,625747,627046,628147,629485,630546,631872,632958,633968,635409,636457,637685,638983,640174,641442,642671,643614,644814,646029,646841,647861,648793,650110,651176,652035,652960,654002,655180,656303,657507,658794,660024,661197,662265,663246,664424,665513,666612,667477,668670,669650,670879,672204,673350,674685,675651,676828,677839,678906,679791,680810,681607,682636,683439,684763,685962,687379,688754,689915,691158,692323,693558,694801,695960,697145,698362,699634,700669,701538,702538,703915,705014,706305,707657,708616,709888,711165,712463,713770,714956,716145,717380,718619,719456,720432,721199,722300,723536,724738,725901,726971,728172,729134,730414,731554,732695,733981,735225,736384,737682,739078,740622,742026,743498,744642,746055,747281,748683,750076,751316,752576,753725,755196,756616,757947,759177,760438,761685,762912,764232,765473,766706,767924,768762,770050,771266,772485,773622,774577,775863,776997,777957,779116,780310,781437,782649,783805,784887,786451,787490,788325,789525,790665,791812,793076,794386,795838,797212,798259,799685,800930,802083,803520,804608,805858,807167,808408,809418,810571,811683,812913,814097,815178,816175,817096,818300,819542,820408,821100,822249,823102,824215,825309,826465,827656,828691,829565,830726,831761,832629,833889,835233,836467,837845,839116,840471,841782,843052,844505,845743,847075,848269,849578,850658,851642,852670,853786,854969,856206,857360,858535,859223,860488,861464,862616,863807,865028,866140,867592,868790,870157,871372,872622,873525,874435,875616,876688,877905,879171,880024,880863,882177,883238,884274,885371,886630,887786,889042,889747,890458,891559,892796,893956,894894,895919,897141,898216,898926,899777,900637,901544,902388,903279,904177,904923,905445,906103,906953,907816,908663,909467,910350,911198,912073,912916,913623,914501,915368,916240,917053,917895,918660,919388,920090,920798,921580,922403,923197,924076,924965,925850,926917,927801,928991,930134,931153,932057,933186,934396,935486,936758,937945,939512,941257,942536,943405,944432,945400,947215,948353,949379,950604,951741,952926,954197,955495,956499,957752,958515,959314,960304,961266,962213,963561,964919,966329,967538,968592,969608,970507,971464,972459,973531,974595,975161,976198,977109,978219,979216,980437,981613,982652,983463,984353,985536,986827,987750,989524,991351,993169,994974,996827,998667,1000481,1002309,1004125,1005950,1006969,1007792,1008420,1009420,1010694,1012210,1013253,1014281,1015270,1016058,1016898,1017959,1018921,1019847,1020691,1021633,1022453,1023524,1024305,1025408,1026190,1027190,1028191,1029401,1030335,1031534,1032624,1033525,1034344,1035228,1036309,1036917,1038202,1039587,1040850,1042012,1043231,1044447,1045350,1046011,1047069,1048147,1048968,1049688,1050381,1050925,1052101,1052886,1053568,1053996,1054743,1055566,1056845,1058230,1059706,1060715,1061569,1062269,1063213,1064254,1065187,1066162,1067087,1068189,1069826,1071072,1071686,1072630,1074498,1076319,1078203,1079443,1080578,1081650,1082856,1083620,1084241,1085476,1086585,1087674,1088752,1089986,1091255,1092273,1093392,1094601,1095929,1097168,1098410,1099490,1100369,1101038,1101595,1102613,1103483,1104177,1105207],sizes:[1315,964,942,881,1030,864,1001,991,1567,1425,1332,1147,1505,1390,1368,1385,1149,1235,1140,1510,1334,1101,1111,1220,1222,1056,1215,1632,1400,1125,1380,1301,1319,1399,1532,1532,1534,1494,1413,1502,1217,1407,1399,1143,1476,1432,1523,1436,1415,1558,1531,1239,1461,1420,1407,1500,1442,1404,1387,1388,1292,1273,1376,1426,1387,1366,1210,1203,1465,1358,1289,1505,1203,1224,1357,1394,1550,1401,1389,1395,1505,1292,1405,1466,1174,1486,1371,1346,1259,1405,1236,1443,1405,1569,1502,1379,1306,1315,1433,1410,1461,1612,1422,1566,1392,1351,1485,1496,1433,1380,1243,1075,1418,1306,1361,1391,1339,1327,1451,1365,1370,1284,1327,1428,1279,1320,1333,1314,1386,1416,1525,1396,1469,1441,1443,1284,1194,1369,1239,1345,1354,1208,1322,1438,1244,1476,1225,1477,1119,1231,1446,1361,1271,948,1411,1275,1415,1303,1273,1149,933,1260,1166,1137,1076,645,1249,1305,1022,1032,1142,1050,1387,1121,1141,1691,1387,1105,1204,1449,1398,1169,1217,849,878,1009,741,1240,932,443,804,1138,1017,877,1141,873,1090,1092,1081,1086,1448,1003,766,574,856,820,943,1049,924,1328,1062,1121,1121,1109,1161,1033,1185,1041,1134,1069,1124,989,1181,1151,1213,1236,1284,1267,1221,1298,1354,1110,1066,1286,758,512,1437,1077,1203,1128,1064,1331,1198,1205,1511,1343,1155,1130,1129,1148,1151,1277,831,953,836,952,887,923,1032,1034,813,840,1045,915,934,1028,814,1036,699,734,1079,1059,1214,1218,914,1170,1138,1233,1042,1006,871,1161,1112,1024,1046,993,1139,1083,1266,1266,1315,1191,1305,1293,1170,1008,1796,1342,1138,1278,1121,971,1063,1352,1365,1055,1059,1420,1329,1341,1303,1391,1288,1457,1138,1203,1196,1267,1411,1066,1032,788,843,1175,1436,1371,1397,1110,1005,1303,1277,1207,1201,1177,1385,1017,889,1145,1266,1245,1238,1281,1150,1397,1253,1207,1280,1317,1371,1251,1304,1225,1017,1226,1092,1247,1492,1234,1297,1367,961,804,1209,1152,1017,1261,1278,1308,1258,1121,1112,865,1048,905,1006,1323,1299,1485,1137,1e3,1200,1200,1125,1131,1218,1004,1225,931,1225,1088,961,1144,1098,1357,1149,1351,987,1144,1e3,1049,1005,1226,1407,1585,1478,1340,1271,1384,1183,1090,1335,1090,853,824,1351,1125,1234,1348,1550,1180,1167,975,1052,1498,1399,1382,1129,1322,1175,1214,1185,1262,1023,1401,1132,1417,1471,1395,1420,1502,1420,1355,1232,1322,1349,1214,1330,1359,1237,1316,1280,1389,1397,1324,1358,1365,988,1383,1413,1265,1311,1146,1304,1329,1265,1290,1389,1254,1536,1328,1405,1304,1043,1151,1185,1231,1202,1331,1175,1431,1367,1450,1364,1265,1056,1339,1061,1292,1116,1147,1321,1182,1535,1320,1460,1364,1359,1319,1144,1243,1142,840,1365,1234,1281,1175,1352,1470,1514,1299,1101,1338,1061,1326,1086,1010,1441,1048,1228,1298,1191,1268,1229,943,1200,1215,812,1020,932,1317,1066,859,925,1042,1178,1123,1204,1287,1230,1173,1068,981,1178,1089,1099,865,1193,980,1229,1325,1146,1335,966,1177,1011,1067,885,1019,797,1029,803,1324,1199,1417,1375,1161,1243,1165,1235,1243,1159,1185,1217,1272,1035,869,1e3,1377,1099,1291,1352,959,1272,1277,1298,1307,1186,1189,1235,1239,837,976,767,1101,1236,1202,1163,1070,1201,962,1280,1140,1141,1286,1244,1159,1298,1396,1544,1404,1472,1144,1413,1226,1402,1393,1240,1260,1149,1471,1420,1331,1230,1261,1247,1227,1320,1241,1233,1218,838,1288,1216,1219,1137,955,1286,1134,960,1159,1194,1127,1212,1156,1082,1564,1039,835,1200,1140,1147,1264,1310,1452,1374,1047,1426,1245,1153,1437,1088,1250,1309,1241,1010,1153,1112,1230,1184,1081,997,921,1204,1242,866,692,1149,853,1113,1094,1156,1191,1035,874,1161,1035,868,1260,1344,1234,1378,1271,1355,1311,1270,1453,1238,1332,1194,1309,1080,984,1028,1116,1183,1237,1154,1175,688,1265,976,1152,1191,1221,1112,1452,1198,1367,1215,1250,903,910,1181,1072,1217,1266,853,839,1314,1061,1036,1097,1259,1156,1256,705,711,1101,1237,1160,938,1025,1222,1075,710,851,860,907,844,891,898,746,522,658,850,863,847,804,883,848,875,843,707,878,867,872,813,842,765,728,702,708,782,823,794,879,889,885,1067,884,1190,1143,1019,904,1129,1210,1090,1272,1187,1567,1745,1279,869,1027,968,1815,1138,1026,1225,1137,1185,1271,1298,1004,1253,763,799,990,962,947,1348,1358,1410,1209,1054,1016,899,957,995,1072,1064,566,1037,911,1110,997,1221,1176,1039,811,890,1183,1291,923,1774,1827,1818,1805,1853,1840,1814,1828,1816,1825,1019,823,628,1e3,1274,1516,1043,1028,989,788,840,1061,962,926,844,942,820,1071,781,1103,782,1e3,1001,1210,934,1199,1090,901,819,884,1081,608,1285,1385,1263,1162,1219,1216,903,661,1058,1078,821,720,693,544,1176,785,682,428,747,823,1279,1385,1476,1009,854,700,944,1041,933,975,925,1102,1637,1246,614,944,1868,1821,1884,1240,1135,1072,1206,764,621,1235,1109,1089,1078,1234,1269,1018,1119,1209,1328,1239,1242,1080,879,669,557,1018,870,694,1030,588],successes:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]};compressedData.data=byteArray;assert(typeof Module.LZ4==="object","LZ4 not present - was your app build with  -s LZ4=1  ?");Module.LZ4.loadPackage({metadata:metadata,compressedData:compressedData});Module["removeRunDependency"]("datafile_mpmath.data")}Module["addRunDependency"]("datafile_mpmath.data");if(!Module.preloadResults)Module.preloadResults={};Module.preloadResults[PACKAGE_NAME]={fromCache:false};if(fetched){processPackageData(fetched);fetched=null}else{fetchedCallback=processPackageData}}if(Module["calledRun"]){runWithFS()}else{if(!Module["preRun"])Module["preRun"]=[];Module["preRun"].push(runWithFS)}};loadPackage({files:[{filename:"/lib/python3.8/site-packages/mpmath-1.1.0-py3.8.egg-info",start:0,end:332,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/ctx_iv.py",start:332,end:17130,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/function_docs.py",start:17130,end:297596,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/identification.py",start:297596,end:326866,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/ctx_base.py",start:326866,end:342851,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/math2.py",start:342851,end:361412,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/visualization.py",start:361412,end:372039,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/ctx_mp_python.py",start:372039,end:410152,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/ctx_mp.py",start:410152,end:459824,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/usertools.py",start:459824,end:462853,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/__init__.py",start:462853,end:471453,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/ctx_fp.py",start:471453,end:478025,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/rational.py",start:478025,end:483995,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/functions/zetazeros.py",start:483995,end:514946,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/functions/theta.py",start:514946,end:552266,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/functions/expintegrals.py",start:552266,end:563910,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/functions/bessel.py",start:563910,end:601848,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/functions/zeta.py",start:601848,end:638219,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/functions/rszeta.py",start:638219,end:684403,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/functions/elliptic.py",start:684403,end:723433,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/functions/factorials.py",start:723433,end:729148,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/functions/qfunctions.py",start:729148,end:736781,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/functions/functions.py",start:736781,end:754842,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/functions/__init__.py",start:754842,end:755150,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/functions/hypergeometric.py",start:755150,end:806720,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/functions/orthogonal.py",start:806720,end:822817,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/calculus/extrapolation.py",start:822817,end:896106,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/calculus/odes.py",start:896106,end:906014,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/calculus/polynomials.py",start:906014,end:913868,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/calculus/inverselaplace.py",start:913868,end:945003,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/calculus/differentiation.py",start:945003,end:965229,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/calculus/calculus.py",start:965229,end:965328,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/calculus/optimization.py",start:965328,end:997747,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/calculus/__init__.py",start:997747,end:997909,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/calculus/quadrature.py",start:997909,end:1036221,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/calculus/approximation.py",start:1036221,end:1045038,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/matrices/eigen_symmetric.py",start:1045038,end:1103562,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/matrices/calculus.py",start:1103562,end:1122171,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/matrices/matrices.py",start:1122171,end:1153766,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/matrices/linalg.py",start:1153766,end:1180786,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/matrices/__init__.py",start:1180786,end:1180880,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/matrices/eigen.py",start:1180880,end:1205262,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/libmp/libhyper.py",start:1205262,end:1241886,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/libmp/gammazeta.py",start:1241886,end:1320812,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/libmp/six.py",start:1320812,end:1332667,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/libmp/libelefun.py",start:1332667,end:1376528,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/libmp/backend.py",start:1376528,end:1379385,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/libmp/libmpi.py",start:1379385,end:1407007,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/libmp/__init__.py",start:1407007,end:1410867,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/libmp/libintmath.py",start:1410867,end:1427329,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/libmp/libmpf.py",start:1427329,end:1472345,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/libmp/libmpc.py",start:1472345,end:1499214,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/tests/test_str.py",start:1499214,end:1499758,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/tests/runtests.py",start:1499758,end:1504576,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/tests/test_fp.py",start:1504576,end:1594573,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/tests/test_identify.py",start:1594573,end:1595265,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/tests/test_elliptic.py",start:1595265,end:1619910,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/tests/extratest_zeta.py",start:1619910,end:1620913,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/tests/test_visualization.py",start:1620913,end:1621857,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/tests/test_special.py",start:1621857,end:1624705,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/tests/extratest_gamma.py",start:1624705,end:1631933,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/tests/test_pickle.py",start:1631933,end:1632334,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/tests/test_functions2.py",start:1632334,end:1729324,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/tests/test_trig.py",start:1729324,end:1734123,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/tests/test_quad.py",start:1734123,end:1737877,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/tests/test_functions.py",start:1737877,end:1768832,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/tests/test_eigen_symmetric.py",start:1768832,end:1777610,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/tests/test_levin.py",start:1777610,end:1782700,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/tests/test_eigen.py",start:1782700,end:1786605,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/tests/test_convert.py",start:1786605,end:1795115,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/tests/test_mpmath.py",start:1795115,end:1795311,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/tests/test_ode.py",start:1795311,end:1797133,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/tests/test_linalg.py",start:1797133,end:1807589,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/tests/test_basic_ops.py",start:1807589,end:1822788,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/tests/test_power.py",start:1822788,end:1828015,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/tests/test_bitwise.py",start:1828015,end:1835701,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/tests/__init__.py",start:1835701,end:1835701,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/tests/test_calculus.py",start:1835701,end:1844672,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/tests/test_division.py",start:1844672,end:1850012,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/tests/test_summation.py",start:1850012,end:1851871,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/tests/test_diff.py",start:1851871,end:1854337,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/tests/test_matrices.py",start:1854337,end:1859755,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/tests/torture.py",start:1859755,end:1867623,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/tests/test_hp.py",start:1867623,end:1878084,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/tests/test_rootfinding.py",start:1878084,end:1881326,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/tests/test_gammazeta.py",start:1881326,end:1908989,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/tests/test_compatibility.py",start:1908989,end:1911295,audio:0},{filename:"/lib/python3.8/site-packages/mpmath/tests/test_interval.py",start:1911295,end:1928428,audio:0}],remote_package_size:1109891,package_uuid:"480d5c32-5f19-4f22-ad17-2130d180f1a1"})})();