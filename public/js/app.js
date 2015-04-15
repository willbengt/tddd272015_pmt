angular.module('pmt', [])
.factory('timeElements', [function(){ 
  var o = {
    timeElements: []
  }; 
  return o;
}])
.controller('MainCtrl', [
  '$scope', 
  'timeElements',
  function($scope, timeElements){ 
    $scope.timeElements = timeElements.timeElements; 
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