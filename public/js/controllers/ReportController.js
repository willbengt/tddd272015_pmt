

angular.module('TimeReportApp')

    .controller('ReportController', ['$scope', '$http', function($scope, Reports){

        $scope.fetchData = function() {
            console.log("fetching data again");
            $scope.tableInformation = Reports.query;
            /*$http.get('/fetchdata').success(
                function(response){
                    $scope.tableInformation = response;
                    console.log("data fetched");
                }
            ).error(
                $scope.subheader = "Bad response"
            );*/
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
            Reports.post($scope.form).success(function(msg){
            //$http.post('/senddata', $scope.form).success(function(msg){
                if(msg.msg != 'ok'){
                    $scope.msg = 'Something went wrong when trying to store in database';
                }
            });
            $scope.fetchData(); // If I dont fetch data here I cannot delete it if there is no new fetch.
            $scope.form = {};
        };

    }]);