angular.module('app.reportApp').factory('ReportService', [
  'Restangular', 
  function(Restangular) {
    console.log('ReportService running');
    Restangular.setBaseUrl("/api");
    var model = 'reports';
    var Report = Restangular.service(model);
    
    return Report;
  }
]);