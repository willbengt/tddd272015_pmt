app.controller('ProjectController', ['$scope', '$stateParams', 'Project', function($scope, $stateParams, Project){
  var projectId = $stateParams.projectId;

 	$scope.project = [];

  $scope.loadProject = function() {
    $scope.project = Project.get({id:projectId}, function() {
      console.log("success (GET http://localhost:3000/api/projects/" + projectId + ")");
    }, function(error) {
      console.log("error (GET http://localhost:3000/api/projects/" + projectId + ")");
    });
  };
}]);