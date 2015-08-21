app.controller('ReportController', ['$scope', '$http', function($scope, $http){

    $scope.fetchData = function() {
        $http.get('/fetchdata').success(
            function(response){
                $scope.tableInformation = response;
            }
        ).error(
            $scope.subheader = "Bad response"
        );
    };

    $scope.salesData = [
        {hour: 1,sales: 54},
        {hour: 2,sales: 66},
        {hour: 3,sales: 77},
        {hour: 4,sales: 70},
        {hour: 5,sales: 60},
        {hour: 6,sales: 63},
        {hour: 7,sales: 55},
        {hour: 8,sales: 47},
        {hour: 9,sales: 55},
        {hour: 10,sales: 30}
    ];

    $scope.deleteReport = function(reportEntry, report){
        report.splice(report.indexOf(reportEntry), 1);
        $http.put('/deletedata', reportEntry).success(function(msg) {
            if(msg != 'ok'){
                $scope.msg = 'Something went wrong when trying to store in database';
            }
        });
    };

    $scope.addReport = function(report){
        report.push($scope.form);
        $http.post('/senddata', $scope.form).success(function(msg){
            if(msg != 'ok'){
                $scope.msg = 'Something went wrong when trying to store in database';
            }
        });
        $scope.form = {};
    };

}]);