app.controller('ProjectsController', ['$scope', '$stateParams', function($scope, $stateParams){
  console.log("ProjectController running");
  $scope.projectId = $stateParams.projectId;
}]);