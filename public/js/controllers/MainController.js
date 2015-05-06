app.controller('MainController', ['$scope', '$http', function($scope, $http){
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