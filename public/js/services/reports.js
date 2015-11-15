/**
 * Created by teddy on 13/09/15.
 */
angular.module('TimeReportApp')

    .factory('Report', function($resource) {
        return $resource('/report/:id', {id: '@id'}, {
        	'update': {method: 'PUT'}
        });
    });