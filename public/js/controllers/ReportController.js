app.controller('ReportController', ['$scope', '$http', '$filter', function($scope, $http, $filter){

    fetchData = function() {
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

    $scope.projects = [];
    loadProjects = function() {
        console.log("loadProjects");
        return $http.get('/api/projects').success(function(data) {
            console.log("success (GET http://localhost:3000/api/projects)");
            $scope.projects = data;
        }).error(function() {
            console.log("error (GET http://localhost:3000/api/projects)");
        });
    };

    $scope.init = function() {
        fetchData();
        loadProjects();
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

    $scope.saveReport = function(data, id) {
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
    };

}]);