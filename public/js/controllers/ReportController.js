
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

angular.module('TimeReportApp')

    .controller('ReportController', function($scope, Report){

        $scope.tempReport = new Report();
        $scope.tableInformation = {};

        /* Service for fetching projects must be implemented */
        $scope.projects = {
            projectsSelector :  null,
            availableProjects : [
                {id: '', name: 'All'},
                {id: '1', name: 'Project 1'},
                {id: '2', name: 'Project 2'},
                {id: '3', name: 'Project 3'}
            ]
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

        $scope.fetchData = function() {
            $scope.tableInformation = Report.query();
        };

        /* This function needs error handling */
        $scope.deleteReport = function(reportId){
            console.log("deleting report: " + reportId);
            $scope.tempReport.$delete({id: reportId });
            $scope.fetchData();
        };

        /* This function needs error handling */
        $scope.addReport = function(){
            $scope.tempReport.$save($scope.form);
            $scope.fetchData(); // If I dont fetch data here I cannot delete it if there is no new fetch.
            $scope.form = {};
        };

    });