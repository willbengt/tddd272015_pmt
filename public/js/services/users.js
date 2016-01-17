/**
 * Created by teddy on 28/08/15.
 */
angular.module('TimeReportApp')
    .factory('User', ['$resource', function($resource) {
        return $resource('/api/users/:id', {id: '@id'}, {
          'update': {method: 'PUT'}
        });
    }]);
