/**
 * Created by teddy on 13/09/15.
 */

angular.module('TimeReportApp')

    .factory('Reports', function UserFactory($resource){
        return $resource('/reports/:id', {params: {token: '@accessToken'}}, {
            validate: {method: 'GET'}
        });
    });