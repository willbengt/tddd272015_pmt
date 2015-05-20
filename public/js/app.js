var app = angular.module("TimeReportApp", ['ui.router']).config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

	  $stateProvider
	    .state('home', {
	      url: '/home',
	      templateUrl: '/views/home.html',
	      controller: 'MainController'
		 // , directive: 'd3.js'
	    })

	    .state('reports', {
	      url: '/reports',
	      templateUrl: '/views/reports.html',
	      controller: 'ReportController'
	    });

	  $urlRouterProvider.otherwise('home');
	}]);

app.directive('helloWorld', function() {
	return {
		restrict: 'AE',
		replace: 'true',
		template: '<h3>Hello World!!</h3>'
	};
});

app.directive('donutChart', function(){
	function link(scope, el){
		d3.select(el[0]).append('svg')
	}
	return {
		link: link,
		restrict: 'E'
	}
})
