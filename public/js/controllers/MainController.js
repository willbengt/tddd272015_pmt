app.controller('MainController', ['$scope', '$http', function($scope, $http){
    $tableInformation = {}
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
    this.msg = 'New Post'

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