angular.module('TimeReportApp')
  
    .factory('Membership', function($resource) {
        return $resource('/api/memberships/:userId', {userId: '@user'}, {
            'update': {method: 'PUT'}
        });
    });