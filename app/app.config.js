/**
 * Created by prasanna_d on 10/24/2017.
 */
app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when("/train_schedule",{
            //Login page
            templateUrl: "app/views/train.schedule.view.html",
            controller: 'TrainScheduleController',
            resolve:{
                init: function () {
                    console.log('Navigate to train schedule view');
                }
            }
        })
        .otherwise({redirectTo: '/train_schedule'});
}]);