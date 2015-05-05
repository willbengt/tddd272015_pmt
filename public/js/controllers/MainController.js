app.controller('MainController', ['$scope', function($scope, $http){
    $scope.name = "Time Reporting shit"
    $scope.headingshow ="Headingshow"

    $scope.fetchData = function() {
        $scope.headingshow = "Nat annat"
        $http.get('/fetchdata').
            success(
            function(response){
                $scope.name = response.name,
                $scope.project = response.project,
                $scope.time = response.time,
                $scope.text = response.text
            }
        ).
            error(
            $scope.headingshow = "Bad response"
        );
    }
}]);