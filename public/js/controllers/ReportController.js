app.controller('ReportController', ['$scope', '$http', function($scope, $http){

    $scope.fetchData = function() {
        console.log("fetching data again")
        $http.get('/fetchdata').success(
            function(response){
                $scope.tableInformation = response;
                console.log("data fetched");
            }
        ).error(
            $scope.subheader = "Bad response"
        );
    };



    $scope.deleteReport = function(reportEntry, report){
        console.log("deleting report")
        report.splice(report.indexOf(reportEntry), 1);
        $http.put('/deletedata', reportEntry).success(function(msg) {
            if(msg.msg != 'ok'){
                $scope.msg = 'Something went wrong when trying to delete from database';
            }
            else{
                console.log("now refetching data after a deleted report!")
                $scope.fetchData();
            }

        });
    };

    $scope.addReport = function(report){
        report.push($scope.form);
        $http.post('/senddata', $scope.form).success(function(msg){
            if(msg.msg != 'ok'){
                $scope.msg = 'Something went wrong when trying to store in database';
            }
        });
        $scope.fetchData(); // If I dont fetch data here I cannot delete it if there is no new fetch.
        $scope.form = {};
    };

}]);