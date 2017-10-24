/**
 * Created by prasanna_d on 10/24/2017.
 */
app.factory('PageRefreshService', [function(){
    let services = {};
    services.run = run;
    return services;

    function run() {
        console.log('Page Refreshed');
    }
}]);