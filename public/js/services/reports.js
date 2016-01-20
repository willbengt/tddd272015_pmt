angular.module('TimeReportApp')

    .factory('Report', function($resource) {
        return $resource('/api/reports/:id', {id: '@id'}, {
            'update': {method: 'PUT'}
        });
    });