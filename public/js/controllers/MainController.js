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

app.controller('HandleReportController', ['$http', function($http){
    this.msg = 'As normal'

    this.deleteReport = function(reportEntry, report){
        report.splice(report.indexOf(reportEntry), 1);
        $http.put('/deletedata', reportEntry).success(function(msg) {
            if(msg != 'ok'){
                this.msg = 'Something went wrong when trying to store in database'
            }
        });
    };
}]);

app.controller('AddReportController', ['$http', function($http){
    this.form = {}

    this.addReport = function(report){
        report.push(this.form);
        $http.post('/senddata', this.form).success(function(msg){
            if(msg != 'ok'){
                this.msg = 'Something went wrong when trying to store in database'
            }
        });
        this.form = {};
    };
}]);