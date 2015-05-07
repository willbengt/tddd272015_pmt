angular.module('app.reportApp').controller("ReportListCtrl", [
  '$scope', 'ReportService', 'Restangular',
  function($scope, ReportService, Restangular){
    console.log('ReportListCtrl running');

    $scope.loadReports = function(){
      ReportService.getList().then(function(reports) {
        $scope.reports = reports;
      });
    };
    $scope.loadReports();
  }
]);