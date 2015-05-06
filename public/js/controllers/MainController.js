app.controller('MainController', ['$scope', '$http', function($scope, $http){
    $scope.name = "Time Reporting shit"
    $scope.headingshow ="header with no other purpose"
    $scope.subheadershow="subheader for now"
    $scope.tableInformation =""
    $scope.responsdata ="responsdata"
    $scope.timereport = [
        {
            name: "name",
            proj: "proj",
            time: "time",
            text: "text"

        }]



    $scope.fetchData = function() {
        $http.get('/fetchdata').
            success(
            function(response){
                $scope.tableInformation =response
               }
        ).
            error(
            $scope.responsdata = "Bad response"
        );
    }

    $scope.inputData = function(){
        $http.post('/postdata').
            success(
            function(name, proj, time, text){
                $scope.headingshow = "some kind of success"
            }
        ).
            error(
            $scope.headingshow = "nah, this aint working perfect"
        );
    }

}]);