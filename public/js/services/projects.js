/**
 * Created by teddy on 13/09/15.
 */

angular.module('TimeReportApp')

    .factory('Projects', function UserFactory($resource){
        return $resource('/projects/:id', {user: window.localStorage.user_name.slice(1, -1), token: window.localStorage.access_token.slice(1, -1)}, {
            validate: {method: 'GET'}
        });
    })