/**
 * Created by prasanna_d on 10/24/2017.
 */
app.controller('TrainScheduleController',[
    '$scope', '$http', 'host_url',
    function($scope, $http, host_url){

        // Initialize variables

        $scope.test = {
            'End Station_6': "05:47:00",
            'End Time_6': "COLOMBO FORT",
            'Name_6': "06:30:00",
            'Start Time_6': "05:46:00",
            'Train No_6': "More",
            'Your Station_7': "KAPUWATTE"
        };

        $scope.testfunc = function () {
            let arrival = '';
            let departure = '';
            let destination = '';
            let destination_time = '';
            Object.keys($scope.test)
                .forEach(function (key) {
                    if(key.includes('End Station')){
                        departure = $scope.test[key];
                    }else if(key.includes('End Time')){
                        destination = $scope.test[key];
                    }else if(key.includes('Name')){
                        destination_time = $scope.test[key];
                    }else if(key.includes('Start Time')){
                        arrival =  $scope.test[key];
                    }
                });
            let tmpObjCon = {
                arrival: arrival,
                depature: departure,
                des_time: destination + ' ' + destination_time
            }
        };

        $scope.onInit = async function(){
            let trainScheduleList = await loadTrainStations();
            $scope.trainStationList = trainScheduleList;
            $scope.$apply();
            $scope.from_station = trainScheduleList[51].station_name;
            $scope.to_station = trainScheduleList[51].station_name;
            //Initialize date and time
            let current_date = new Date();
            $scope.schedule_date = current_date.getDate() + "/" +
                        (current_date.getMonth()+1) + "/" + current_date.getFullYear();
            $scope.schedule_from_time = "00:00";
            $scope.schedule_to_time = "23:59";
            $scope.isLoading = false;
            //Update the user statistics
            let response = await $http({
                method: 'POST',
                url: host_url + 'users/update_statistics_trainwebapp'
            });
        };

        $scope.search = async function () {
            $scope.isLoading = true;
            try {
                let response = await $http({
                    method: 'GET',
                    url: host_url + 'users/schedule',
                    params: {
                        start_station: $scope.from_station,
                        end_station: $scope.to_station,
                        start_time: $scope.schedule_from_time + ':00',
                        end_time: $scope.schedule_to_time + ':00',
                        date: $scope.schedule_date
                    }
                });
                $scope.isLoading = false;
                if (response) {
                    let con_results = response.data.data.connected;
                    $scope.connected_results = [];
                    for(let i=0; i<con_results.length; i++){
                        let con_result_item = con_results[i];
                        let arrival = '';
                        let departure = '';
                        let destination = '';
                        let destination_time = '';
                        Object.keys(con_result_item)
                            .forEach(function (key) {
                                if(key.includes('End Station')){
                                    departure = con_result_item[key];
                                }else if(key.includes('End Time')){
                                    destination = con_result_item[key];
                                }else if(key.includes('Name')){
                                    destination_time = con_result_item[key];
                                }else if(key.includes('Start Time')){
                                    arrival =  con_result_item[key];
                                }
                            });
                        $scope.connected_results.push({
                            arrival: arrival,
                            depature: departure,
                            des_time: destination + ' ' + destination_time
                        });
                    }
                    console.log('-------------');
                    console.log($scope.connected_results);
                    console.log('-------------');
                    $scope.normal_results = response.data.data.normal;
                    $scope.banner = "Search results from " + $scope.from_station + " to "
                        + $scope.to_station + " on " + $scope.schedule_date + " between " +
                            $scope.schedule_from_time + " Hrs and " + $scope.schedule_to_time + " Hrs";
                    $scope.train_count = (response.data.data.normal.length +
                                            response.data.data.connected.length);
                    if(response.data.online){$scope.status = 'Online'}
                    else{$scope.status = 'Offline'}
                    $scope.$apply();
                }
                console.log(response);
            }catch (err){
                $scope.isLoading = false;
                console.log(err);
            }
        };

        function loadTrainStations(){
            //Train schedule list
            return [
                {station_id:3, station_name:"ABANPOLA", station_code:"ABN"},
                {station_id:410, station_name:"ADAGALA", station_code:"Adagala"},
                {station_id:11, station_name:"AHANGAMA", station_code:"ANM"},
                {station_id:18, station_name:"AHUNGALLE", station_code:"AUH"},
                {station_id:13, station_name:"AKBOPURA", station_code:"APR"},
                {station_id:7, station_name:"AKURALA", station_code:"AKU"},
                {station_id:22, station_name:"ALAWATUPITIYA", station_code:"AWP"},
                {station_id:9, station_name:"ALAWWA", station_code:"ALW"},
                {station_id:329, station_name:"ALUTH AMBALAMA", station_code:""},
                {station_id:8, station_name:"ALUTHGAMA", station_code:"ALT"},
                {station_id:1, station_name:"AMBALANGODA", station_code:"ABA"},
                {station_id:2, station_name:"AMBEWELA", station_code:"ABL"},
                {station_id:14,station_name: "AMBEYPUSSA", station_code:"APS"},
                {station_id:19, station_name:"ANAWILUNDAWA", station_code:"AVD"},
                {station_id:10, station_name:"ANDADOLA", station_code:"AND"},
                {station_id:5, station_name:"ANGAMPITIYA", station_code:""},
                {station_id:4, station_name:"ANGULANA", station_code:"AGL"},
                {station_id:12,station_name:"ANURADHAPURA", station_code:"ANP"},
                {station_id:15, station_name:"ANURADHAPURA TOWN", station_code:"APT"},
                {station_id:6, station_name:"ARACHCHIKATTUWA", station_code:"AKT"},
                {station_id:343, station_name:"ARAPATHGAMA", station_code:""},
                {station_id:16,station_name: "ARUKKUWATTE", station_code:""},
                {station_id:17, station_name:"ASELAPURA", station_code:"ASL"},
                {station_id:467, station_name:"ASGIRIYA", station_code:"ASG"},
                {station_id:21, station_name:"AUKANA", station_code:"AWK"},
                {station_id:20, station_name:"AVISSAWELLA", station_code:""},
                {station_id:23, station_name:"BADULLA", station_code:"BAD"},
                {station_id:31, station_name:"BALANA", station_code:"BNA"},
                {station_id:34, station_name:"BALAPITIYA", station_code:"BPA"},
                {station_id:35,station_name: "BAMBALAPITIYA", station_code:"BPT"},
                {station_id:25, station_name:"BANDARAWELA", station_code:"BDA"},
                {station_id:475, station_name:"Bandirippuwa", station_code:""},
                {station_id:28, station_name:"BANGADENIYA", station_code:"BGY"},
                {station_id:39,station_name: "BASELINE ROAD", station_code:"BSL"},
                {station_id:33,station_name:"BATTALUOYA", station_code:"BOA"},
                {station_id:24, station_name:"BATTICALOA", station_code:"BCO"},
                {station_id:41, station_name:"BATUWATTE", station_code:"BTU"},
                {station_id:26, station_name:"BEMMULLA", station_code:"BEM"},
                {station_id:32, station_name:"BENTOTA", station_code:"BNT"},
                {station_id:36, station_name:"BERUWALA", station_code:"BRL"},
                {station_id:30, station_name:"BOLAWATTE", station_code:"BLT"},
                {station_id:38, station_name:"BOOSSA", station_code:"BSH"},
                {station_id:37, station_name:"BORELESSA", station_code:"BSA"},
                {station_id:40, station_name:"BOTALE", station_code:"BTL"},
                {station_id:27, station_name:"BULUGAHAGODA", station_code:"BGH"},
                {station_id:29, station_name:"BUTHGAMUWA", station_code:"BJM"},
                {station_id:398, station_name:"CHAVAKACHCHERI", station_code:""},
                {station_id:371, station_name:"CHEDDIIKULAM", station_code:""},
                {station_id:44,station_name: "CHILAW", station_code:"CHL"},
                {station_id:43, station_name:"CHINA BEY", station_code:"CBY"},
                {station_id:423, station_name:"CHUNNAKAM", station_code:""},
                {station_id:61, station_name:"COLOMBO FORT", station_code:"FOT"},
                {station_id:46, station_name:"COTTA ROAD", station_code:"CRD"},
                {station_id:53, station_name:"DARALUWA", station_code:"DRL"},
                {station_id:457, station_name:"DEC", station_code:""},
                {station_id:54, station_name:"DEHIWALA", station_code:"DWL"},
                {station_id:337, station_name:"Dekinda", station_code:""},
                {station_id:47, station_name:"DEMATAGODA", station_code:"DAG"},
                {station_id:48, station_name:"DEMODARA", station_code:"DDR"},
                {station_id:52, station_name:"DEWAPURAM", station_code:"DPM"},
                {station_id:417, station_name:"DEWEDDA", station_code:"Dewedda"},
                {station_id:50, station_name:"DIYATALAWA", station_code:"DLA"},
                {station_id:51, station_name:"DODANDUWA", station_code:"DNA"},
                {station_id:60, station_name:"EGODA UYANA", station_code:"EYA"},
                {station_id:395, station_name:"ELIPHANT PASS", station_code:"EPS"},
                {station_id:57, station_name:"ELLE", station_code:"ELL"},
                {station_id:401, station_name:"ELUTHUMATTUVAL", station_code:""},
                {station_id:341, station_name:"ELWALA", station_code:""},
                {station_id:55, station_name:"ENDERAMULLA", station_code:"EDM"},
                {station_id:56, station_name:"ERATTAPERIYAKULAM", station_code:"EKM"},
                {station_id:59,station_name: "ERAVUR", station_code:"EVR"},
                {station_id:58, station_name:"ERUKKALAM PENDU", station_code:"EPN"},
                {station_id:104, station_name:"FREE TRADE ZONE", station_code:"IPZ"},
                {station_id:64, station_name:"GALABODA", station_code:"GBD"},
                {station_id:69, station_name:"GALGAMUWA", station_code:"GLM"},
                {station_id:68, station_name:"GALLE", station_code:"GLE"},
                {station_id:62, station_name:"GALLELLA", station_code:"GAL"},
                {station_id:74, station_name:"GALOYA JUNCTION", station_code:"GOA"},
                {station_id:70, station_name:"GAMMANA", station_code:"GMA"},
                {station_id:75, station_name:"GAMPAHA", station_code:"GPH"},
                {station_id:76, station_name:"GAMPOLA", station_code:"GPL"},
                {station_id:71, station_name:"GANEGODA", station_code:"GND"},
                {station_id:63, station_name:"GANEMULLA", station_code:"GAN"},
                {station_id:73, station_name:"GANEWATTE", station_code:"GNW"},
                {station_id:479, station_name:"Gangathilaka", station_code:""},
                {station_id:65, station_name:"GANGODA", station_code:"GDA"},
                {station_id:440, station_name:"GANTALAWA", station_code:""},
                {station_id:66, station_name:"GELIOYA", station_code:"GEY"},
                {station_id:72, station_name:"GINTHOTA", station_code:"GNT"},
                {station_id:476, station_name:"GIRAMBE", station_code:"GRB"},
                {station_id:77, station_name:"GIRAMBE", station_code:"GRB"},
                {station_id:67, station_name:"GODAGAMA", station_code:"GGA"},
                {station_id:79, station_name:"GREAT WESTERN", station_code:"GWN"},
                {station_id:81, station_name:"HABARADUWA", station_code:"HBD"},
                {station_id:82, station_name:"HABARANA", station_code:"HBN"},
                {station_id:456, station_name:"Hadiriwalana", station_code:""},
                {station_id:84, station_name:"HALIELA", station_code:"HEA"},
                {station_id:92, station_name:"HAPUTALE", station_code:"HPT"},
                {station_id:80, station_name:"HATAMUNA", station_code:"HAU"},
                {station_id:87, station_name:"HATARAS KOTUWA", station_code:"HKT"},
                {station_id:96, station_name:"HATTON", station_code:"HTN"},
                {station_id:89, station_name:"HEEL OYA", station_code:"HLO"},
                {station_id:83, station_name:"HEENDENIYA", station_code:"HDP"},
                {station_id:91, station_name:"HETTIMULLA", station_code:"HML"},
                {station_id:86, station_name:"HIKKADUWA", station_code:"HKD"},
                {station_id:93, station_name:"HINGURAKGODA", station_code:"HRG"},
                {station_id:444, station_name:"HINGURALA", station_code:""},
                {station_id:94, station_name:"HIRIYALA", station_code:"HRL"},
                {station_id:90,station_name: "HOMAGAMA", station_code:"HMA"},
                {station_id:85, station_name:"HOMAGAMA HOSPITAL", station_code:"HHR"},
                {station_id:95, station_name:"HORAPE", station_code:"HRP"},
                {station_id:88, station_name:"HORIWIALA", station_code:"HLA"},
                {station_id:97, station_name:"HUNUPITIYA", station_code:"HUN"},
                {station_id:98, station_name:"HYINPORT", station_code:""},
                {station_id:100, station_name:"IDALGASINNA", station_code:"IGH"},
                {station_id:101, station_name:"IHALAGAMA", station_code:"IHA"},
                {station_id:102, station_name:"IHALAKOTTE", station_code:"IKT"},
                {station_id:105,station_name: "IHALAWATAWALA", station_code:"IWL"},
                {station_id:99, station_name:"INDURUWA", station_code:"IDA"},
                {station_id:103, station_name:"INGURUOYA", station_code:"INO"},
                {station_id:428, station_name:"INUVIL", station_code:""},
                {station_id:107, station_name:"JA-ELA", station_code:"JLA"},
                {station_id:400, station_name:"JAFFNA", station_code:""},
                {station_id:106, station_name:"JAYANTHIPURA", station_code:"JAP"},
                {station_id:338, station_name:"KACHCHERI HALL", station_code:""},
                {station_id:114, station_name:"KADADASI NAGAR", station_code:"KDN"},
                {station_id:128, station_name:"KADIGAMUWA", station_code:"KMA"},
                {station_id:120, station_name:"KADUGANNAWA", station_code:"KGW"},
                {station_id:113, station_name:"KADUGODA", station_code:"KDG"},
                {station_id:480, station_name:"Kahatapitiya", station_code:""},
                {station_id:152, station_name:"KAHAWA", station_code:"KWE"},
                {station_id:154, station_name:"KAKKAPALLIYA", station_code:"KYA"},
                {station_id:127, station_name:"KALAWEWA", station_code:"KLW"},
                {station_id:123, station_name:"KALKUDAH", station_code:"KKH"},
                {station_id:147, station_name:"KALUTARA NORTH", station_code:"KTN"},
                {station_id:148, station_name:"KALUTARA SOUTH", station_code:"KTS"},
                {station_id:130, station_name:"KAMBURUGAMUWA", station_code:"KMG"},
                {station_id:108, station_name:"KANDANA", station_code:"KAN"},
                {station_id:119, station_name:"KANDEGODA", station_code:"KGD"},
                {station_id:115, station_name:"KANDY", station_code:"KDT"},
                {station_id:424, station_name:"KANKESANTHURAI", station_code:""},
                {station_id:132, station_name:"KANTALE", station_code:"KNI"},
                {station_id:110, station_name:"KAPUWATTE", station_code:"KAW"},
                {station_id:139, station_name:"KARADIPUWAL", station_code:"KPL"},
                {station_id:146, station_name:"KATHALUWA", station_code:"KTL"},
                {station_id:109, station_name:"KATTUWA", station_code:"KAT"},
                {station_id:144, station_name:"KATUGASTOTA", station_code:"KTG"},
                {station_id:468, station_name:"KATUGASTOTA     ROAD", station_code:""},
                {station_id:150, station_name:"KATUGODA", station_code:"KUG"},
                {station_id:122, station_name:"KATUKURUNDA", station_code:"KKD"},
                {station_id:42, station_name:"KATUNAYAKA AIRPORT", station_code:"CAK"},
                {station_id:145, station_name:"KATUNAYAKE", station_code:"KTK"},
                {station_id:117, station_name:"KEENAWALA", station_code:"KEN"},
                {station_id:141, station_name:"KEKIRAWA", station_code:"KRA"},
                {station_id:124, station_name:"KELANIYA", station_code:"KLA"},
                {station_id:333, station_name:"KILINOCHCHI", station_code:"KOC"},
                {station_id:133, station_name:"KINIGAMA", station_code:"KNM"},
                {station_id:447, station_name:"KIRINDIWELA", station_code:""},
                {station_id:138, station_name:"KIRULAPANA", station_code:"KPE"},
                {station_id:116, station_name:"KITAL ELLE", station_code:"KEL"},
                {station_id:111, station_name:"KOCHCHIKADE", station_code:"KCH"},
                {station_id:397, station_name:"KODIKAMAM", station_code:""},
                {station_id:134, station_name:"KOGGALA", station_code:"KOG"},
                {station_id:474, station_name:"KOHOMBILIWALA", station_code:""},
                {station_id:429, station_name:"KOKUVIL", station_code:""},
                {station_id:126, station_name:"KOLLUPITIYA", station_code:"KLP"},
                {station_id:453, station_name:"KOLONNAWA", station_code:"KLN"},
                {station_id:125, station_name:"KOLONNAWA", station_code:"KLN"},
                {station_id:140, station_name:"KOMPANNAVEDIYA", station_code:"KPN"},
                {station_id:422, station_name:"KONDAVIL", station_code:""},
                {station_id:135, station_name:"KONWEWA", station_code:"KON"},
                {station_id:136, station_name:"KORALAWELLA", station_code:"KOR"},
                {station_id:143, station_name:"KOSGAMA", station_code:"KSG"},
                {station_id:112, station_name:"KOSGODA", station_code:"KDA"},
                {station_id:121, station_name:"KOSHINNA", station_code:"KHA"},
                {station_id:118, station_name:"KOTAGALA", station_code:"KGA"},
                {station_id:137, station_name: "KOTTAWA", station_code:"KOT"},
                {station_id:153, station_name:"KUDA WAWA", station_code:"KWW"},
                {station_id:149, station_name:"KUDAHAKAPOLA", station_code:"KUD"},
                {station_id:131, station_name:"KUMARAKANDA", station_code:"KMK"},
                {station_id:129, station_name:"KUMBALGAMA", station_code:"KMB"},
                {station_id:408, station_name:"KURAHANHENAGAMA", station_code:"Kurahanhenagama"},
                {station_id:151, station_name:"KURANA", station_code:"KUR"},
                {station_id:142, station_name:"KURUNEGALA", station_code:"KRN"},
                {station_id:158, station_name:"LAKSAUYANA", station_code:"LYA"},
                {station_id:155, station_name:"LIYANAGEMULLA", station_code:"LGM"},
                {station_id:334, station_name:"LIYANWALA", station_code:"LIYANWALA"},
                {station_id:156, station_name:"LUNAWA", station_code:"LNA"},
                {station_id:157, station_name:"LUNUWILA", station_code:""},
                {station_id:181, station_name:"MADAMPAGAMA", station_code:"MPA"},
                {station_id:161, station_name:"MADAMPE", station_code:"MDP"},
                {station_id:372, station_name:"MADHU ROAD", station_code:"MRD"},
                {station_id:174, station_name:"MADURANKULIYA", station_code:"MKI"},
                {station_id:472, station_name:"Magalegoda", station_code:""},
                {station_id:393, station_name:"MAGALEGODA", station_code:""},
                {station_id:167, station_name:"MAGGONA", station_code:"MGN"},
                {station_id:452, station_name:"MAGULEGODA", station_code:""},
                {station_id:190, station_name:"MAHAIYAWA", station_code:"MYA"},
                {station_id:159, station_name:"MAHARAGAMA", station_code:"MAG"},
                {station_id:170, station_name:"MAHO", station_code:"MHO"},
                {station_id:182, station_name:"MALAPALLE", station_code:"MPL"},
                {station_id:427, station_name:"MALLAKAM", station_code:""},
                {station_id:183, station_name:"MANAMPITIYA", station_code:"MPT"},
                {station_id:165, station_name:"MANGALAELIYA", station_code:"MGE"},
                {station_id:331, station_name:"MANKULAM", station_code:"MKM"},
                {station_id:434, station_name:"MANNAR", station_code:"MNR"},
                {station_id:179, station_name:"MANUWANGAMA", station_code:"MNG"},
                {station_id:160, station_name:"MARADANA", station_code:"MDA"},
                {station_id:462, station_name:"MARAKONA", station_code:""},
                {station_id:454, station_name:"MARALUWEWA", station_code:"Maraluwewa"},
                {station_id:186, station_name:"MATALE", station_code:"MTL"},
                {station_id:187, station_name:"MATARA", station_code:"MTR"},
                {station_id:432, station_name:"MATHOTTAM", station_code:""},
                {station_id:466, station_name:"MAVILMADA", station_code:""},
                {station_id:425, station_name:"MAVITTAPURAM", station_code:""},
                {station_id:163, station_name:"MEDAGAMA", station_code:"MEM"},
                {station_id:189, station_name:"MEDAWACHCHIYA", station_code:"MWH"},
                {station_id:421, station_name:"MEDDEGAMA", station_code:""},
                {station_id:464, station_name:"MEEGAMMANA", station_code:""},
                {station_id:164, station_name:"MEEGODA", station_code:"MGD"},
                {station_id:403, station_name:"MEESALAI", station_code:""},
                {station_id:188, station_name:"MHA INDURUWA", station_code:"MWA"},
                {station_id:162, station_name:"MIDIGAMA", station_code:"MED"},
                {station_id:169, station_name:"MIHINTALE", station_code:"MHN"},
                {station_id:168, station_name:"MIHINTALE JUNCTION", station_code:"MHJ"},
                {station_id:173, station_name:"MINNERIYA", station_code:"MIY"},
                {station_id:171, station_name:"MIRIGAMA", station_code:"MIR"},
                {station_id:409, station_name:"MIRIHANPITIGAMA", station_code:"Mihihanpitigama"},
                {station_id:172, station_name:"MIRISSA", station_code:"MIS"},
                {station_id:443, station_name:"MIRISWATTA", station_code:""},
                {station_id:402, station_name:"MIRUSUVIL", station_code:""},
                {station_id:177, station_name:"MOLLIPATANA", station_code:"MLP"},
                {station_id:176, station_name:"MORAGOLLAGAMA", station_code:"MLG"},
                {station_id:175, station_name:"MORAKELE", station_code:"MKP"},
                {station_id:184, station_name:"MORATUWA", station_code:"MRT"},
                {station_id:439, station_name:"MOUNT LAVINIA", station_code:""},
                {station_id:180, station_name:"MUNDAL", station_code:"MNL"},
                {station_id:332, station_name:"MURIKANDY", station_code:"MRK"},
                {station_id:431, station_name:"MURUNKAN", station_code:""},
                {station_id:185, station_name:"MUTHTHETTUGALA", station_code:"MTG"},
                {station_id:191, station_name:"NAGOLLAGAMA", station_code:"NAG"},
                {station_id:196, station_name:"NAILIYA", station_code:"NLY"},
                {station_id:197, station_name:"NANUOYA", station_code:"NOA"},
                {station_id:195, station_name:"NARAHENPITA", station_code:"NHP"},
                {station_id:192, station_name:"NATTANDIYA", station_code:"NAT"},
                {station_id:399, station_name:"NAVATKULI", station_code:""},
                {station_id:201, station_name:"NAWALAPITIYA", station_code:"NVP"},
                {station_id:202, station_name:"NAWINNA", station_code:"NWN"},
                {station_id:194, station_name:"NEGAMA", station_code:"NGM"},
                {station_id:193, station_name:"NEGOMBO", station_code:"NGB"},
                {station_id:415, station_name:"NELUMPATHGAMA", station_code:"Nelumpathgama"},
                {station_id:199, station_name:"NELUMPOKUNA", station_code:"NPK"},
                {station_id:370,station_name: "NERIYAKULAM", station_code:"NYK"},
                {station_id:198,station_name: "NOORANAGAR", station_code:"NOR"},
                {station_id:200, station_name:"NUGEGODA", station_code:"NUG"},
                {station_id:203, station_name:"OHIYA", station_code:"OHA"},
                {station_id:204, station_name:"OMANTHAI", station_code:"OMT"},
                {station_id:208, station_name:"PADUKKA", station_code:"PDK"},
                {station_id:420, station_name:"PAHALAWARDHANA", station_code:"Pahalawardhana"},
                {station_id:238, station_name:"PALAVI", station_code:"PVI"},
                {station_id:396, station_name:"PALLAI", station_code:"PAL"},
                {station_id:465, station_name:"PALLE TALAVINNA", station_code:""},
                {station_id:219, station_name:"PALLEWALA", station_code:"PLL"},
                {station_id:237, station_name:"PALUGASWEWA", station_code:"PUW"},
                {station_id:223, station_name:"PANADURA", station_code:"PND"},
                {station_id:224, station_name:"PANAGODA", station_code:"PNG"},
                {station_id:226, station_name:"PANALEEYA", station_code:"PNL"},
                {station_id:233, station_name:"PANGIRIWATTA", station_code:"PRW"},
                {station_id:205, station_name:"PANNIPITIYA", station_code:"PAN"},
                {station_id:216, station_name:"PARAKUMPURA", station_code:"PKU"},
                {station_id:394, station_name:"PARANTHAN", station_code:"PRN"},
                {station_id:213, station_name:"PARASANGAHAWEWA", station_code:"PHW"},
                {station_id:209, station_name:"PATAGAMGODA", station_code:"PGD"},
                {station_id:236, station_name:"PATHANPHA", station_code:"PTP"},
                {station_id:230, station_name:"PATTIPOLA", station_code:"PPL"},
                {station_id:211, station_name:"PAYAGALA NORTH", station_code:"PGN"},
                {station_id:212, station_name:"PAYAGALA SOUTH", station_code:"PGS"},
                {station_id:232, station_name:"PEMROSE", station_code:""},
                {station_id:207,station_name:"PERADENIYA", station_code:"PDA"},
                {station_id:459, station_name:"PERAKUMPURA", station_code:"PKP"},
                {station_id:231, station_name:"PERALANDA", station_code:"PRL"},
                {station_id:227, station_name:"PERIYANAGAVILLU", station_code:"PNV"},
                {station_id:436, station_name:"PESALAI", station_code:""},
                {station_id:217, station_name:"PILIDUWA", station_code:"PLD"},
                {station_id:222, station_name:"PILIMATALAWA", station_code:"PLT"},
                {station_id:416, station_name:"PINNAGOLLA", station_code:"Pinnagolla"},
                {station_id:228, station_name:"PINNAWALA", station_code:"PNW"},
                {station_id:214, station_name:"PINWATTE", station_code:"PIN"},
                {station_id:210, station_name:"PIYADIGAMA", station_code:"PGM"},
                {station_id:240, station_name:"PIYAGAMA", station_code:"PYA"},
                {station_id:477, station_name:"Polgaha Anga", station_code:""},
                {station_id:218, station_name:"POLGAHAWELA", station_code:"PLG"},
                {station_id:220, station_name:"POLONNARUWA", station_code:"PLN"},
                {station_id:221, station_name:"POLWATHUMODARA", station_code:"PLR"},
                {station_id:229, station_name:"POONEWA", station_code:"PON"},
                {station_id:419, station_name:"PORAPOLA", station_code:"Porapola"},
                {station_id:418, station_name:"PORAPOLA JUNC.", station_code:"Porapola Juc."},
                {station_id:234, station_name:"POTUHERA", station_code:"PTA"},
                {station_id:206, station_name:"PULACHCHIKULAM", station_code:"PCK"},
                {station_id:330, station_name:"PULIYANKULAM", station_code:"PKM"},
                {station_id:225, station_name:"PUNANI", station_code:"PNI"},
                {station_id:406, station_name:"PUNKANKULAM", station_code:""},
                {station_id:235, station_name:"PUTTALAM", station_code:"PTM"},
                {station_id:445, station_name:"PUWAKPITIYA", station_code:"PWP"},
                {station_id:446, station_name:"PUWAKPITIYA TOWN", station_code:""},
                {station_id:243, station_name:"RADELLA", station_code:"RDL"},
                {station_id:246, station_name:"RAGAMA", station_code:"RGM"},
                {station_id:241, station_name:"RAMBUKKANA", station_code:"RBK"},
                {station_id:247, station_name:"RANAMUGGAMUWA", station_code:"RMA"},
                {station_id:245, station_name:"RANDENIGAMA", station_code:"RGA"},
                {station_id:249, station_name:"RATHGAMA", station_code:"RTG"},
                {station_id:248, station_name:"RATMALANA", station_code:"RML"},
                {station_id:244, station_name:"REDEETHENNA", station_code:"RDT"},
                {station_id:242, station_name:"RICHMOND HILL", station_code:"RCH"},
                {station_id:250, station_name:"ROSELLA", station_code:"RZL"},
                {station_id:251, station_name:"SALIYAPURA", station_code:"SAL"},
                {station_id:404, station_name:"SANKATHANAI", station_code:""},
                {station_id:257, station_name:"SARASAVIUYANA", station_code:"SUA"},
                {station_id:259, station_name:"SAWARANA", station_code:"SWR"},
                {station_id:252, station_name:"SECRETARTAT HALT", station_code:"SCR"},
                {station_id:253, station_name:"SEEDUWA", station_code:"SED"},
                {station_id:255, station_name:"SEENIGAMA", station_code:"SMA"},
                {station_id:254, station_name:"SENARATHGAMA", station_code:"SGM"},
                {station_id:258, station_name:"SEVANAPITIYA", station_code:"SVP"},
                {station_id:339, station_name:"SIYABALANGAMUWA", station_code:""},
                {station_id:260, station_name:"SIYALANGAMUWA", station_code:"SYA"},
                {station_id:256, station_name:"SRAWASTHIPURA", station_code:"SRP"},
                {station_id:437, station_name:"TALAIMANNAR", station_code:""},
                {station_id:438, station_name:"TALAIMANNAR PIER", station_code:""},
                {station_id:270, station_name:"TALAWA", station_code:"TLA"},
                {station_id:269, station_name:"TALAWAKELE", station_code:"TKL"},
                {station_id:276, station_name:"TALAWATTEGEDARA", station_code:"TWG"},
                {station_id:461, station_name:"TAWALANOYA", station_code:""},
                {station_id:426, station_name:"TELLIPALLAI", station_code:""},
                {station_id:277, station_name:"TELWATTE", station_code:"TWT"},
                {station_id:262, station_name:"TEMBLIGALA", station_code:"TBL"},
                {station_id:405, station_name:"THACHANTHOPPU", station_code:""},
                {station_id:271, station_name:"THALPE", station_code:"TLP"},
                {station_id:414, station_name:"THAMBAGALLA", station_code:"Thambagalla"},
                {station_id:263, station_name:"THAMBUTTEGAMA", station_code:"TBM"},
                {station_id:450, station_name:"THAMPALAKAMAM", station_code:""},
                {station_id:265, station_name:"THANDIKULAM", station_code:"TDK"},
                {station_id:433, station_name:"THIIRUKETHEESWARAM", station_code:""},
                {station_id:267, station_name:"THILLADIYA", station_code:"TDY"},
                {station_id:272, station_name:"THIRANAGAMA", station_code:"TNA"},
                {station_id:435, station_name:"THODDAVELI", station_code:""},
                {station_id:455, station_name:"Thuruliyagama", station_code:""},
                {station_id:268, station_name:"TIMBIRIYAGEDARA", station_code:"TIM"},
                {station_id:274, station_name:"TISMALPOLA", station_code:"TSM"},
                {station_id:273, station_name:"TRAIN HALT 01", station_code:"TRH"},
                {station_id:264, station_name:"TRINCOMALEE", station_code:""},
                {station_id:275, station_name:"TUDELLA", station_code:"TUD"},
                {station_id:266, station_name:"TUMMODARA", station_code:"TDR"},
                {station_id:278, station_name:"UDATALAWINNA", station_code:"UDL"},
                {station_id:285, station_name:"UDATHTHAWALA", station_code:"UWL"},
                {station_id:281, station_name:"UDHAMULLA", station_code:"UHM"},
                {station_id:413, station_name:"UDUGODAGAMA", station_code:"Udugodagama"},
                {station_id:279, station_name:"UDUWARA", station_code:"UDW"},
                {station_id:280, station_name:"UGGALLA", station_code:"UGL"},
                {station_id:282, station_name:"UKUWELA", station_code:"UKL"},
                {station_id:283, station_name:"ULAPANE", station_code:""},
                {station_id:284, station_name:"UNAWATUNA", station_code:"UNW"},
                {station_id:451, station_name:"Urugodawattha", station_code:""},
                {station_id:412, station_name:"UYANGALLA", station_code:"Uyangalla"},
                {station_id:286, station_name:"VALACHCHENEI", station_code:"VCH"},
                {station_id:288, station_name:"VANDARAMULLAI", station_code:"VML"},
                {station_id:289, station_name:"VAVUNIYA", station_code:"VNA"},
                {station_id:287, station_name:"VEYANGODA", station_code:"VGD"},
                {station_id:340, station_name:"VIRALMURIPPUWA", station_code:"Viralmurippuwa"},
                {station_id:292, station_name:"WADDUWA", station_code:"WDA"},
                {station_id:295, station_name:"WAGA", station_code:"WGG"},
                {station_id:299, station_name:"WAIKKALA", station_code:"WKL"},
                {station_id:296, station_name:"WALAHAPITIYA", station_code:"WHP"},
                {station_id:407, station_name:"WALASWEWA", station_code:"Walaswewa"},
                {station_id:301, station_name:"WALGAMA", station_code:"WLG"},
                {station_id:303, station_name:"WALPOLA", station_code:"WPA"},
                {station_id:306, station_name:"WANAWASALA", station_code:"WSL"},
                {station_id:305, station_name:"WANDURAWA", station_code:"WRW"},
                {station_id:308, station_name:"WATAGODA", station_code:"WTG"},
                {station_id:336, station_name:"WATARAKA", station_code:""},
                {station_id:300, station_name:"WATAWALA", station_code:"WLA"},
                {station_id:294, station_name:"WATTEGAMA", station_code:"WGA"},
                {station_id:478, station_name:"Weligalla", station_code:""},
                {station_id:302, station_name:"WELIGAMA", station_code:"WLM"},
                {station_id:298, station_name:"WELIKANDA", station_code:"WKD"},
                {station_id:293, station_name:"WELLAWA", station_code:"WEL"},
                {station_id:307, station_name:"WELLAWATTA", station_code:"WTE"},
                {station_id:411, station_name:"WERAGALA", station_code:"Weragala"},
                {station_id:304, station_name:"WIJAYARAJADAHANA", station_code:"WRD"},
                {station_id:309, station_name:"WILWATTE", station_code:"WWT"},
                {station_id:297, station_name:"WLAKUBURA", station_code:"WKA"},
                {station_id:473, station_name:"YAGODA", station_code:"YGD"},
                {station_id:387, station_name:"YAGODA", station_code:"YGD"},
                {station_id:315, station_name:"YAPAHUWA", station_code:"YPW"},
                {station_id:313, station_name:"YATAGAMA", station_code:"YGM"},
                {station_id:463, station_name:"YATAWARA", station_code:"YATAWARA"},
                {station_id:311, station_name:"YATIRAWANA", station_code:"YATIRAWANA"},
                {station_id:316, station_name:"YATTALGODA", station_code:"YTG"}
            ]
        }
    }
]);