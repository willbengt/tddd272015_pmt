angular.module('TimeReportApp')

    .factory('Authenticate', function($resource) {
        return $resource('/api/authenticate/:id', {}, {
        });
    });