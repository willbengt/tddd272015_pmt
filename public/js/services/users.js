/**
 * Created by teddy on 28/08/15.
 */
angular.module('TimeReportApp')
    .factory('User', function($resource) {
        return $resource('/api/users/:id', {id: '@id'}, {
            'update': {method: 'PUT'}
        });
    });


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