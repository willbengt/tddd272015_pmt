app.controller('ReportController', ['$scope', '$http', function($scope, $http){

    $scope.fetchData = function() {
        console.log("fetching data again")
        $http.get('/report').success(
            function(response){
                $scope.tableInformation = response;
                console.log("data fetched");
            }
        ).error(
            $scope.subheader = "Bad response"
        );
    };

    $scope.deleteReport = function(id){
        console.log("deleting report with id = " + id);

        $http.delete('/report/' + id).success(function(msg) {
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
        $http.post('/report', $scope.form).success(function(msg){
            if(msg.msg != 'ok'){
                $scope.msg = 'Something went wrong when trying to store in database';
            }
        });
        $scope.fetchData(); // If I dont fetch data here I cannot delete it if there is no new fetch.
        $scope.form = {};
    };

}]);