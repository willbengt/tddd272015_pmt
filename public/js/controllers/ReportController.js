app.controller('ReportController', ['$scope', '$http', '$filter', function($scope, $http, $filter){

<<<<<<< HEAD
    $scope.set = {
        time: [ ],
        project: [ ]
    };

    $scope.fetchData = function() {
        console.log("fetching data")
        $http.get('/fetchdata').success(
=======
    fetchData = function() {
    
        console.log("fetching data again");
        
        $http.get('/report').success(
>>>>>>> 6deae3a05a8954d544860fc132d5db56d3b2c381
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
        ).error(function() {
            $scope.subheader = "Bad response"
        });
    };

<<<<<<< HEAD
// above here is for the chartController
=======
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

    $scope.init = function() {
        fetchData();
        loadProjects();
    };
>>>>>>> 6deae3a05a8954d544860fc132d5db56d3b2c381

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