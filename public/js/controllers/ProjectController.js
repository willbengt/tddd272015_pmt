app.controller('ProjectController', ['$scope', '$stateParams', '$http', '$filter', 'Project', function($scope, $stateParams, $http, $filter, Project){
  var projectId = $stateParams.projectId;

 	$scope.project = [];

  loadProject = function() {
    $scope.project = Project.get({id:projectId}, function() {
      console.log("success (GET http://localhost:3000/api/projects/" + projectId + ")");
    }, function(error) {
      console.log("error (GET http://localhost:3000/api/projects/" + projectId + ")");
    });
  };

  loadReports = function() {
  	$http.get('/report').success(function(response) {
      console.log("success (GET http://localhost:3000/report)");
      $scope.reports = $filter('filter')(response, {project: $scope.project.id}); 
    }).error(function() {
      console.log("error (GET http://localhost:3000/report)");
    });
  };

  $scope.init = function() {
    loadProject();
    loadReports();
  };
}]);