app.controller('MainController', ['$scope', '$http', function($scope, $http){
    $scope.name = "Time Reporting shit"
    $scope.header ="header with no other purpose"
    $scope.subheader="subheader for now"
    $scope.tableInformation = []
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
                $scope.tableInformation = response
               }
        ).
            error(
            $scope.subheader = "Bad response"
        );
    }

    $scope.inputData = function(){
        $http.post('/postdata').
            success(
            function(name, proj, time, text){
                $scope.subheader = "some kind of success"
            }
        ).
            error(
            $scope.subheader = "nah, this aint working perfect"
        );
    }

}]);

app.controller('AddReportController', ['$http', function($http){
    this.form = {}
    this.msg = 'hej'

    this.addReport = function(report){
        this.msg = 'Enter function';
        report.push(this.form);
        $http.post('/senddata', this.form).success(this.msg = 'Success');
        this.form = {};
    };
}]);