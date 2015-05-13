app.controller('ReportController', ['$scope', '$http', function($scope, $http){

    $scope.fetchData = function() {
        $http.get('/fetchdata').success(
            function(response){
                $scope.tableInformation = response
            }
        ).error(
            $scope.subheader = "Bad response"
        );
    };

    $scope.deleteReport = function(reportEntry, report){
        report.splice(report.indexOf(reportEntry), 1);
        $http.put('/deletedata', reportEntry).success(function(msg) {
            if(msg != 'ok'){
                $scope.msg = 'Something went wrong when trying to store in database'
            }
        });
    };

    $scope.addReport = function(report){
        report.push($scope.form);
        $http.post('/senddata', $scope.form).success(function(msg){
            if(msg != 'ok'){
                $scope.msg = 'Something went wrong when trying to store in database'
            }
        });
        $scope.form = {};
    };
}]);