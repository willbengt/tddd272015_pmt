angular.module('pmt', ['ui.router'])

.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '/home.html',
        controller: 'ReportCtrl'
      })

      .state('timeelements', {
        url: '/timeelements/{id}',
        templateUrl: '/timeelements.html',
        controller: 'EditCtrl'
      })

    $urlRouterProvider.otherwise('home');
  }
])

.factory('timeElements', [function(){ 
  var o = {
    elements: []
  }; 
  return o;
}])

.controller('ReportCtrl', [
  '$scope', 
  'timeElements',
  function($scope, timeElements){ 
    $scope.timeElements = timeElements.elements;
    //console.log($scope.timeElements);
    //$scope.timeElement = timeElements.elements[$stateParams.id];
    $scope.addTimeElement = function(){   	
      $scope.timeElements.push({
        date: $scope.date,
        name: $scope.name, 
    		start: $scope.start,
    		end: $scope.end
    	});
    };
  }
])

.controller('EditCtrl', [
  '$scope',
  '$stateParams',
  'timeElements',
  function($scope, $stateParams, timeElements) {
      $scope.timeElement = timeElements.elements[$stateParams.id];
  /*
      $scope.addComment = function(){
          if($scope.body === '') { return; }
          $scope.post.comments.push({
              body: $scope.body,
              author: 'user',
              upvotes: 0
          });
          $scope.body = '';
      };

  */
  }
]);

