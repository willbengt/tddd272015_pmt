angular.module('TimeReportApp')

    .factory('Authenticate', function AuthenticateFactory($resource) {
        return $resource('/api/authentication', {}, {
        });
    });
