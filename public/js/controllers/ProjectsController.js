app.controller('ProjectsController', ['$scope', '$filter', 'Project', 'User', 'Membership', 'Session',
    function($scope, $filter, Project, User, Membership, Session) {

        var memberships = [];
        var selectedProjects = [];

        $scope.checkName = function(data) {
            if (!data) {return "Name is required";}
        };

        $scope.checkTime = function(data) {
            if (!data) {
              return "Time is required";
            }
            
            var time = parseFloat(data);   
            if (isNaN(time) || time < 0) {
              return "The time must be a number greater or equal to zero"; 
            }
        };

        $scope.init = function() {
            $scope.projects = Project.query({ user: window.localStorage.user_name.slice(1, -1), token: window.localStorage.access_token.slice(1, -1)});
            $scope.users = User.query();
            memberships = Membership.query();
            $scope.userName = window.localStorage.user_name.slice(1, -1)
        };

        $scope.saveProject = function(elementData, elementId) {
            project = new Project();
            angular.extend(project, {id: elementId, user: window.localStorage.user_name.slice(1, -1), token: window.localStorage.access_token.slice(1, -1)}, elementData);
            project.$update();
        };

        $scope.removeProject = function(project, rowIndex) {
            $scope.projects.splice(rowIndex, 1);
            selectedProjects.splice(selectedProjects.indexOf(project.id), 1);
            project.$delete();
        };

        $scope.addProject = function() {
            $scope.inserted = new Project();
            $scope.inserted.user = window.localStorage.user_name.slice(1, -1);
            $scope.inserted.token = window.localStorage.access_token.slice(1, -1)

            $scope.inserted.$save(function(response) {
                $scope.inserted.id = response.id;
                selectedProjects.push(response.id);
                $scope.projects.push($scope.inserted);
            });
        };
    }]);