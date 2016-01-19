angular.module('TimeReportApp')

    .factory('ResourceInterceptor', function() {

      var rootUrl = "http://tddd27-timereportapp.rhcloud.com"

      return {
          request: function (config) {
              return config;
          },

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
});