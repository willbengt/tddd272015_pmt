/**
 * Created by rasmus on 2015-08-21.
 */
app.controller('ChartController', ['$scope', '$http', function($scope, $http){

    $scope.chartData = function() {
        $http.get('/chartdata').success(
            function(response){
                $scope.tableInformation = response;
            }
        ).error(
            $scope.subheader = "Bad response"
        );
    };
}]);