app.controller('ProjectController', ['$scope', '$http', function($scope, $http){
	$scope.projects = [];

  $scope.loadProjects = function() {
    return $http.get('/project').success(function(data) {
      console.log("success (GET http://localhost:3000/project)");
      $scope.projects = data;
    }).error(function() {
      console.log("error (GET http://localhost:3000/project)");
    });
  };
}]);