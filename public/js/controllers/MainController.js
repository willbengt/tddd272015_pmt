app.controller('MainController', ['$scope', '$http', function($scope, $http){
    $scope.name = "Time Reporting shit"
    $scope.headingshow ="Headingshow"
    $scope.responsdata ="responsdata"
    $scope.timereport = [
        {
            name: "name",
            proj: "proj",
            time: "time",
            text: "text"

        }]



    $scope.fetchData = function() {
        $scope.headingshow = "Nat annat"
        $http.get('/fetchdata').
            success(
            function(response){
                $scope.headingshow =response,
                $scope.responsdata = response.name,
                $scope.timereport.name = response.name,
                $scope.timereport.proj = response.project,
                $scope.timereport.time = response.time,
                $scope.timereport.text = response.text
            }
        ).
            error(
            $scope.headingshow = "Bad response"
        );
    }
}]);