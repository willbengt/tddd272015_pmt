app.controller('ProjectsController', ['$scope', '$filter', 'Project', 'User', 'Membership', 'Session', 'Report',
    function($scope, $filter, Project, User, Membership, Session, Report) {

        var reports = [];

        $scope.validateName = function(data) {
            if (!data) {return "Name is required";}
        };

        $scope.validateTime = function(data, project) {
            if (!data) {return "Time is required";} 

            if (isNaN(data) || parseFloat(data) < 0) {return "The time must be a number greater or equal to zero";}

            var totalReportedTime = 0;

            for (var i = 0; i < reports.length; i++) {
                if(reports[i].project_id == project.id) {
                    totalReportedTime += reports[i].time;
                }
            }

            if(data < totalReportedTime) {
              return "The time must be greater than the total reported time (" + totalReportedTime.toFixed(1) + " hours)";
            }
        };

        $scope.init = function() {
            Report.query({user: window.localStorage.user_name.slice(1, -1), token: window.localStorage.access_token.slice(1, -1)},
              function(response){
                  var reports = response;
              });
            Project.query({user: window.localStorage.user_name.slice(1, -1), token: window.localStorage.access_token.slice(1, -1)},
              function(response){
                  $scope.projects = response;
              });
            $scope.userName = window.localStorage.user_name.slice(1, -1)
        };

        $scope.saveProject = function(elementData, elementId) {
            project = new Project();
            angular.extend(project, {id: elementId, user: window.localStorage.user_name.slice(1, -1), token: window.localStorage.access_token.slice(1, -1)}, elementData);
            project.$update();
        };

        $scope.removeProject = function(project, rowIndex) {
            $scope.projects.splice(rowIndex, 1);
            project.$delete();
        };

        $scope.addProject = function() {
            $scope.inserted = new Project();
            $scope.inserted.user = window.localStorage.user_name.slice(1, -1);
            $scope.inserted.token = window.localStorage.access_token.slice(1, -1)

            $scope.inserted.$save(function(response) {
                $scope.inserted.id = response.id;
                $scope.projects.push($scope.inserted);
            });
        };
    }]);