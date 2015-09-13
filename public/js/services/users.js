/**
 * Created by teddy on 28/08/15.
 */
angular.module('TimeReportApp')

   /* .factory('User', function UserFactory($Resource){
        return $Resource('/users/:id', {}, {
            validate: {
                method: 'GET',
                params: {token: '@accessToken'}
            }
        });
    })*/

    .factory('Test', function TestFactory() {
        return {
            all: function() {
            return 'Connection to TestFactory works';
        }
    };
    });