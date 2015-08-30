app.controller('ReportController', ['$scope', '$http', function($scope, $http){

    $scope.set = {
        time: [ ],
        project: [ ]
    };

    $scope.fetchData = function() {
        console.log("fetching data")
        $http.get('/fetchdata').success(
            function(response){
                $scope.tableInformation = response;
                $scope.set.time = [];
                $scope.set.project = [];
                _.times($scope.tableInformation.length, function(n) {
                //    $scope.set.x.push(n + 1);
                    $scope.set.time.push($scope.tableInformation[n].time);
                    $scope.set.project.push($scope.tableInformation[n].project);
                });
                console.log($scope.set.time);
                console.log($scope.set.project);

            }
        ).error(
            $scope.subheader = "Bad response"
        );
    };

// above here is for the chartController

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