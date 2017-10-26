/**
 * Created by prasanna_d on 10/24/2017.
 */
app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when("/train_schedule",{
            templateUrl: "app/views/train.schedule.view.html",
            controller: 'TrainScheduleController',
            resolve:{
                init: function () {
                    console.log('Navigate to train schedule view');
                }
            }
        })
        .when("/dev/train_schedule",{
            templateUrl: "app/views/dev.train.schedule.view.html",
            controller: 'DevController',
            resolve:{
                init: function () {
                    console.log('Navigate to train schedule dev view');
                }
            }
        })
        .otherwise({redirectTo: '/train_schedule'});
}]);