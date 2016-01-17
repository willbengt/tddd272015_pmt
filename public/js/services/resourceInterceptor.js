//app.factory('ResourceInterceptor',['Session' ,function(Session) {
angular.module('TimeReportApp')

.factory('ResourceInterceptor', ['Session', function(Session) {

    var rootUrl = "http://localhost:3000";
    //var rootUrl = "http://127.0.0.1:3000/";

    return {
        //request: function () {
        //    Session.expired_token();
        //},

        response: function (data) {
            if (data.config.url.search("api") > 0 ) {
                console.log("success (" + data.config.method + ' ' + rootUrl + data.config.url + ")", data);
            }
            return data;
        },

        responseError: function (data) {
            console.log('responseError: ' + data);
            alert("error (" + data.config.method + ' ' + rootUrl + data.config.url + ")");
            console.log("error (" + data.config.method + ' ' + rootUrl + data.config.url + ")", data);
            return data;
        }
    };
}]);