var app = angular.module("TimeReportApp", ['ui.router']).config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

	  $stateProvider
	    .state('home', {
	      url: '/home',
	      templateUrl: '/views/home.html',
	      controller: 'MainController'
	    });

	  $urlRouterProvider.otherwise('home');
	}])


