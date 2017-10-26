/**
 * Created by prasanna_d on 10/26/2017.
 */
app.controller('DevController',[
    '$scope', '$http', 'host_url',
    function ($scope, $http, host_url) {
        $scope.train_station = {};
        $scope.isLoading = false;
        $scope.type = '';
        $scope.usage = 0;

        $scope.days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        Array.prototype.chunk = function ( n ) {
            if ( !this.length ) {
                return [];
            }
            return [ this.slice( 0, n ) ].concat( this.slice(n).chunk(n) );
        };

        $scope.itemClick = async function(item){
            $scope.id = item.id;
            $scope.start_station_id = item.start_station_id;
            $scope.end_station_id = item.end_station_id;
            $scope.week_date_id = item.week_date_id;
            if($scope.type==='json'){
            $scope.result_string = JSON.parse(item.result_string);}
            else{$scope.result_string = item.result_string;}
            $scope.createdAt = item.createdAt;
            $scope.updatedAt = item.updatedAt;
        };

        $scope.syncOfflineStorage = async function (type) {
            try {
                $scope.isLoading = true;
                let response = await $http({
                    method: 'GET',
                    crossDomain: true,
                    xhrFields: {withCredentials: false},
                    url: host_url + 'dev/trainScheduleOfflineStorage',
                    params: {}
                });
                $scope.type = type;
                if(response){
                    $scope.offlie_storage = response.data.data;
                    $scope.itemClick($scope.offlie_storage[0]);
                }
                $scope.isLoading = false;
                $scope.$apply();
            }catch (err){
                $scope.isLoading = false;
                $scope.$apply();
                console.log(err);
            }
        };

        $scope.onInit = async function(){
            console.log('DevInit Function is triggered');
            $scope.isLoading = true;
            try {
                let response = await $http({
                    crossDomain: true,
                    xhrFields: {withCredentials: false},
                    method: 'GET',
                    url: host_url + 'dev/trainStations',
                    params: {}
                });
                if(response){
                    let stations = response.data.data;
                    let split_mark = Math.round(stations.length/4);
                    let tmpArr = stations.chunk(split_mark);
                    for(let i=0; i<tmpArr.length; i++){
                        $scope.train_station[i] = tmpArr[i];
                    }
                }
                response = await $http({
                    crossDomain: true,
                    xhrFields: {withCredentials: false},
                    method: 'GET',
                    url: host_url + 'users/trainwebapp_statistics',
                    params: {}
                });
                if(response){
                    $scope.usage = response.data.count;
                }
                $scope.isLoading = false;
                $scope.$apply();
            }catch (err){
                $scope.isLoading = false;
                $scope.$apply();
                console.log(err);
            }
        }
    }
]);