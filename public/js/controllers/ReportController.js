angular.module('TimeReportApp')

    .controller('ReportController', function($scope, $filter, $http, Report, Project){

        $scope.tempReport = new Report();
        $scope.tableInformation = {};
        $scope.projects = [];

  
        $scope.init = function() {
            $scope.loadProjects();
            $scope.fetchData();
        };

        $scope.loadProjects = function() {
            Project.query().$promise.then(
                function(response) {
                    $scope.projects = response;
                    console.log("success loadProjects (GET http://tddd27-timereportapp.rhcloud.com/project)");
                }, function(error) {
                    console.log("error loadProjects (GET http://tddd27-timereportapp.rhcloud.com/project)");
                }
            );
        };

        $scope.fetchData = function() {
            $scope.tableInformation = Report.query({})
                /*.$promise.then(
                function(response) {

                    console.log("success loadReports (GET http://localhost:3000/project)");
                }, function(error) {
                    console.log("error loadReports (GET http://localhost:3000/project)");
                }
            )*/
        };

        /*$scope.fetchData = function() {
            $scope.tableInformation = Report.query();
            /!*Report.query().$promise.then(
                function(response) {
                //    if ($scope.tableinformation != response) {
                        $scope.tableInformation = response;
                    //};
                    console.log("success loadReports (GET http://localhost:3000/project)");
                }, function(error) {
                    console.log("error loadReports (GET http://localhost:3000/project)");
                }
            )*!/
        };*/

        $scope.showProject = function(report) {
            if(report.project && $scope.projects.length) {
                var selected = $filter('filter')($scope.projects, {id: report.project});
                return selected.length ? selected[0].name : 'Not set';
            } else {
                return 'Not set';
            }
        };

        $scope.removeReport = function(reportId, rowIndex){
            $scope.tableInformation.splice(rowIndex, 1);
            $scope.tempReport.$delete({id: reportId }).then(
                function(response) {
                    console.log("success removeReport (DELETE http://tddd27-timereportapp.rhcloud.com/report/" + response.id + ")");
                }, function(error) {
                    console.log("error removeReoprt (DELETE http://tddd27-timereportapp.rhcloud.com/report/" + error.id + ")");
                }
            );
            $scope.fetchData();
        };

        $scope.addReport = function(){
            $scope.inserted = {
                name: '',
                project: '',
                time: '',
                text: ''
            };

            $scope.tempReport.$save($scope.inserted).then(
                function(response) {
                    console.log("success addReport (POST http://tddd27-timereportapp.rhcloud.com/report/" + response.id + ")");
                }, function(error) {
                    console.log("error addReport (POST http://tddd27-timereportapp.rhcloud.com/report/" + error.id + ")");
                });

            $scope.fetchData(); // If I dont fetch data here I cannot delete it if there is no new fetch.
            //$scope.form = {};
        };

        $scope.saveReport = function(data, id) {
            return $http.put('/report/' + id, data).success(function(response) {
                console.log("success updateReport (PUT http://tddd27-timereportapp.rhcloud.com/report/" + id + ")");
            }).error(function() {
                console.log("error updateReport (PUT http://tddd27-timereportapp.rhcloud.com/report/" + id + ")");
            });
        };

    });
