app.controller('ProjectController', ['$scope', '$rootScope', '$stateParams', '$filter', 'Report', 'Project', 
function($scope, $rootScope, $stateParams, $filter, Report, Project) {
  
  var projectId = $stateParams.projectId;

  loadReports = function() {
    Report.query(function(response) {
      $rootScope.reports = $filter('filter')(response, {project: projectId}); 
      $scope.tableInformation = response;
      $scope.set.time = [];
      $scope.set.x = [];
      _.times($scope.tableInformation.length, function(n) {
        if ($scope.tableInformation[n].project == projectId) {
          $scope.set.time.push($scope.tableInformation[n].time);
          $scope.set.x.push(n);
        }
      });
    });
  };

  $scope.init = function() {
    $scope.project = Project.get({id:projectId}, function(resource) {
      $scope.prjtime = resource.time;
    });
    loadReports();
  };

  $scope.saveReport = function(elementData, elementId) {
    var report = new Report();
    angular.extend(report, {id: elementId, project: projectId}, elementData);
    report.$update();
  };

  $scope.removeReport = function(report, rowIndex){
    $rootScope.reports.splice(rowIndex, 1);
    report.$delete();
  };

  $scope.addReport = function() {
    $scope.inserted = new Report();

    $scope.inserted.$save(function(response) {
      $scope.inserted.id = response.id;
      $rootScope.reports.push($scope.inserted);
    });
  };

  $scope.set = {
    time: [],
    x: []
  };
}]);