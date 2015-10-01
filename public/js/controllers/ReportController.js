angular.module('TimeReportApp')

    .controller('ReportController', function($scope, $filter,  Report){

        $scope.tempReport = new Report();
        $scope.tableInformation = {};
        
    $scope.projects = [];
    loadProjects = function() {
        console.log("loadProjects");
        return $http.get('/project').success(function(data) {
            console.log("success (GET http://localhost:3000/project)");
            $scope.projects = data;
        }).error(function() {
            console.log("error (GET http://localhost:3000/project)");
        });
    };

        $http.delete('/report/' + id).success(function(msg) {
            if(msg.msg != 'ok'){
                $scope.msg = 'Something went wrong when trying to delete from database';
            }
            else{
                console.log("now refetching data after a deleted report!")
                $scope.fetchData();
            }

        $scope.fetchData = function() {
            $scope.tableInformation = Report.query();
        };
            
    $scope.showProject = function(report) {
        if(report.project && $scope.projects.length) {
            var selected = $filter('filter')($scope.projects, {id: report.project}); 
            return selected.length ? selected[0].name : 'Not set';
        } else {
            return 'Not set';
        }
    };

    $scope.removeReport = function(id, rowIndex) {
        $scope.tableInformation.splice(rowIndex, 1);
        return $http.delete('/report/' + id).success(function(response) {
            console.log("success (DELETE http://localhost:3000/report/" + id + ")");
        }).error(function() {
            console.log("error (DELETE http://localhost:3000/report/" + id + ")");
        });
    };

/*    $scope.saveReport = function(data, id) {
        return $http.put('/report/' + id, data).success(function(response) {
            console.log("success (PUT http://localhost:3000/report/" + id + ")");
        }).error(function() {
            console.log("error (PUT http://localhost:3000/report/" + id + ")");
        });
    };

    $scope.addReport = function() {
        $scope.inserted = {
            name: '',
            project: '',
            time: '',
            text: ''
        };

        return $http.post('/report', $scope.inserted).success(function(response) {
            console.log("success (POST http://localhost:3000/report)");
            $scope.inserted.id = response.id;
            $scope.tableInformation.push($scope.inserted);
        }).error(function() {
            console.log("error (POST http://localhost:3000/report)");
        });
    };*/
            
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