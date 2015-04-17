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
        url: '/timeelements/{id}', // 'id' is a route parameter that will be made available to EditCtrl.
        templateUrl: '/timeelements.html',
        controller: 'EditCtrl'
      })

    $urlRouterProvider.otherwise('home'); //if the app receives a URL that is not defined it is redirected to 'home'
  }
])

.factory('timeElements', [function(){ //instead of storing our data in our controller, we can use a service to organize and share code across the app. The service factory function generates the single object or function that represents the service to the rest of the application.
  var o = { //we create an object - 'o'
    elements: []  // the array 'elements' is one property of o. 
  }; 
  return o;
}])

.controller('ReportCtrl', [
  '$scope', //$scope is the application object (the owner of application variables and functions).
  'timeElements',
  function($scope, timeElements){ //we inject our timeElements service by adding it as a parameter
    $scope.timeElements = timeElements.elements; //$scope.timeElements in our controller is binded to the elements array in our service. Any change or modification made to $scope.timeElements will be stored in the service.

    if($scope.timeElements.length === 0) { //for testing. just one timeElement as an example. 
      $scope.timeElements.push({ 
        date: '2015-04-16', 
        name: 'William', 
        start: "09:00", 
        end: "10:00"
      });
    }

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
    $scope.timeElement = timeElements.elements[$stateParams.id]; //$stateParams is used to retrieve the id from the URL to load the appropriate element.
    
    $scope.editTimeElement = function(){
      if(angular.isDefined($scope.date)){$scope.timeElement.date = $scope.date;}
      if(angular.isDefined($scope.name)){$scope.timeElement.name = $scope.name;}
      if(angular.isDefined($scope.start)){$scope.timeElement.start = $scope.start;}
      if(angular.isDefined($scope.end)){$scope.timeElement.end = $scope.end;}
      if(angular.isDefined($scope.comment)){  
        $scope.timeElement.comment = $scope.comment;
      }
      else {
        $scope.timeElement.push({comment: $scope.comment});
      }
    };
  }
]);

