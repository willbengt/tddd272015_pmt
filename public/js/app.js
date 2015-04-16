angular.module('pmt', ['ui.router'])
.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '/home.html',
        controller: 'MainCtrl'
      });

    $urlRouterProvider.otherwise('home');
  }
])

.factory('timeElements', [function(){ 
  var o = {
    elements: []
  }; 
  return o;
}])

.controller('MainCtrl', [
  '$scope', 
  'timeElements',
  function($scope, timeElements){ 
    $scope.timeElements = timeElements.elements; 
    $scope.addTimeElement = function(){   	
      $scope.timeElements.push({
        date: $scope.date,
        name: $scope.name, 
    		start: $scope.start,
    		end: $scope.end
    	});
    };
  }
]);