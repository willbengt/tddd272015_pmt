var app = angular.module("TimeReportApp", ['ui.router']).config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

	  $stateProvider
	    .state('home', {
	      url: '/home',
	      templateUrl: '/views/home.html',
	      controller: 'MainController',
		  directive: 'd3.js'
	    })

	    .state('reports', {
	      url: '/reports',
	      templateUrl: '/views/reports.html',
	      controller: 'ReportController'
	    });

	  $urlRouterProvider.otherwise('home');
	}]);
