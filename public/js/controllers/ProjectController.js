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

  $scope.removeProject = function(id, rowIndex) {
    $scope.projects.splice(rowIndex, 1);
    return $http.delete('/project/' + id).success(function(response) {
      console.log("success (DELETE http://localhost:3000/project/" + id + ")");
    }).error(function() {
      console.log("error (DELETE http://localhost:3000/project/" + id + ")");
    });
  };

  $scope.addProject = function() {
    $scope.inserted = {
      name: ''
    };

    return $http.post('/project', $scope.inserted).success(function(response) {
      console.log("success (POST http://localhost:3000/project)");
      $scope.inserted.id = response.id;
      $scope.projects.push($scope.inserted);
    }).error(function() {
      console.log("error (POST http://localhost:3000/project)");
    });
  };
}]);