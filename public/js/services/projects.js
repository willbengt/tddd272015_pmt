/**
 * Created by teddy on 13/09/15.
 */

angular.module('TimeReportApp')

    .factory('Project', function UserFactory($resource){
        /*return $resource('/projects/:id', {params: {token: '@accessToken'}}, {
            validate: {method: 'GET'}
        });*/
        return $resource('/project/:id', {}, {});
    })