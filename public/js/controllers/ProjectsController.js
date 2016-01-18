app.controller('ProjectsController', ['$scope', '$filter', 'Project', 'User', 'Membership', 'Session',
    function($scope, $filter, Project, User, Membership, Session) {

        var selectedProjects = [];


        $scope.init = function() {
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