app.controller('MainController', ['$scope', '$http', function($scope, $http){
    $scope.name = "Time Reporting shit"
    $scope.headingshow ="Headingshow"
    $scope.subheadershow="subheader for now"
    $scope.tableInformation ="troll"
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
                $scope.tableInformation =response
               }
        ).
            error(
            $scope.headingshow = "Bad response"
        );
    }
}]);