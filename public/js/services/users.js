/**
 * Created by teddy on 28/08/15.
 */
angular.module('TimeReportApp')
    .factory('User', ['$resource', function($resource) {
      var rootUrl = "http://localhost:3000";
        return $resource('/api/users/:id', {id: '@id'}, {
          'update': {
            method: 'PUT',
            interceptor: {
              response: function (data) {
                console.log("success (" + data.config.method + ' ' + rootUrl + data.config.url + ")", data);
              },
              responseError: function (data) {
                alert("error (" + data.config.method + ' ' + rootUrl + data.config.url + ")");
                console.log("error (" + data.config.method + ' ' + rootUrl + data.config.url + ")", data);
              }
            },
          }
        });
    }]);


/*
    .factory('User', function UserFactory($resource){
        return $resource('/users/:id', {params: {token: '@accessToken'}}, {
            validate: {method: 'GET'}
        });
    })

    .factory('Test', function TestFactory() {
        return {
            all: function() {
            return 'Connection to TestFactory works';
        }
    };
    });*/