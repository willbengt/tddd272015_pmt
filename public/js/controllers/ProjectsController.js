app.controller('ProjectsController', ['$scope', 'Project', function($scope, Project){
  //var rootUrl = "http://127.0.0.1:3000/";
  var rootUrl = "http://localhost:3000/";

  $scope.projects = [];

  loadProjects = function() {
    console.log("-----------------------");
    $scope.projects = Project.query(function() {
      console.log("success (GET http://127.0.0.1:3000/api/projects)");
    }, function(error) {
      console.log("error (GET http://127.0.0.1:3000/api/projects)");
    });
  };

  $scope.init = function() {
    loadProjects();
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