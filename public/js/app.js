angular.module('flapperNews', [])
.factory('posts', [function(){ //instead of storing our data in our controller, we can use a service to organize and share code across the app. The service factory function generates the single object or function that represents the service to the rest of the application.
  var o = {
    posts: []
  }; //we create an object - 'o' that has 'posts' - an array as one property. 
  return o;
}])
.controller('MainCtrl', [
'$scope', //$scope is the application object (the owner of application variables and functions).
'posts',
function($scope, posts){ //we inject our service by adding it as a parameter
  $scope.posts = posts.posts; //The $scope.posts variable in our controller is binded to the posts array in our service. Any change or modification made to $scope.posts will be stored in the service

  $scope.addPost = function(){
  	if(!$scope.title || $scope.title === '') { return; } //prevents the user from submitting a blank post
  	$scope.posts.push({
  		title: $scope.title, //$scope.title is defined by ng-model in index.html
  		link: $scope.link,
  		upvotes: 0
  	});
  	$scope.title = '';
  	$scope.link = '';
  };

  $scope.incrementUpvotes = function(post) { //the current instance of post is passed by reference so that it gets automatically updated.
  	post.upvotes += 1; 
  };
}]);