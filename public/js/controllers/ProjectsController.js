app.controller('ProjectsController', ['$scope', '$filter', 'Project', 'User', 'Membership', 'Session', function($scope, $filter, Project, User, Membership, Session){
  //var rootUrl = "http://127.0.0.1:3000/";
  var rootUrl = "http://localhost:3000/";

  $scope.projects = [];

  $scope.selectedUser = [];
  var memberships = [];
  var selectedProjects = [];

  $scope.filterProjects = function()  {
    return function(project) {
      return selectedProjects.indexOf(project.id) >= 0;
    };
  }

  $scope.updateSelectedProjects = function(userIdInput) {
    var projectId;
    var userId;
    var projectExists = false;

    selectedProjects = [];
    $scope.selectedUser = ($filter('filter')($scope.users, {id: userIdInput}))[0];

    // var selectedUser = Session.getUser() (function to be implemented)

    for (var i = 0; i < memberships.length; i++) {     
      projectId = memberships[i].project_id;
      userId = memberships[i].user_id;
      projectExists = (selectedProjects.indexOf(projectId) >= 0);
      if (!projectExists && userId == $scope.selectedUser.id) {
        selectedProjects.push(projectId);   
      }
    }
  };

  loadProjects = function() {
    $scope.projects = Project.query(function() {
      console.log("success (GET http://127.0.0.1:3000/api/projects)");
    }, function(error) {
      console.log("error (GET http://127.0.0.1:3000/api/projects)");
    });
  };

  $scope.users = [];
  loadUsers = function() {
    $scope.users = User.query(function() {
      console.log("success (GET " + rootUrl + "api/users)");
    }, function(error) {
      console.log("error (GET " + rootUrl + "api/users)");
    });
  };

  loadMemberships = function() {
    Membership.query(function(response) {
      for (var i = 0; i < response.length; i++) {
        memberships.push(response[i]);
      }
      console.log("success (GET " + rootUrl + "api/memberships)");
    }, function(error) {
      console.log("error (GET " + rootUrl + "api/memberships)");
    });
  };

  $scope.init = function() {
    loadProjects();
    loadUsers();
    loadMemberships();
  };

  $scope.saveProject = function(elementData, elementId) {
    project = new Project();

    angular.extend(project, {id: elementId}, elementData);
      
    project.$update(function() {  
      console.log("success (PUT http://127.0.0.1:3000/api/projects/" + elementId + ")");
    }, function(error) {
      console.log("error (PUT http://127.0.0.1:3000/api/projects/" + elementId + ")");
    });
  };

  $scope.removeProject = function(project, rowIndex) { 
    $scope.projects.splice(rowIndex, 1);
    project.$delete(function() {
      console.log("success (DELETE http://127.0.0.1:3000/api/projects/" + project.id + ")");
    }, function(error) {
      console.log("error (DELETE http://127.0.0.1:3000/api/projects/" + project.id + ")");
    });
  };

  $scope.addProject = function() {
    $scope.inserted = new Project();

    $scope.inserted.$save(function(response) {
      console.log("success (POST http://127.0.0.1:3000/api/projects)");
      $scope.inserted.id = response.id;
      $scope.projects.push($scope.inserted);
    }, function(error) {
      console.log("error (POST http://127.0.0.1:3000/api/projects)");
    });
  };
}]);