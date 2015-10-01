/**
 * Created by teddy on 13/09/15.
 */
angular.module('TimeReportApp')

    .factory('Report', function ReportFactory($resource){
        return $resource('/report/:id', {}, {
        //return $resource('/reports/:id', {params: {token: '@accessToken'}}, {
        //    validate: {method: 'GET'}
        });
    });