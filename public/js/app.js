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

/*
app.directive('helloWorld', function() {
	return {
		restrict: 'AE',
		replace: 'true',
		template: '<h3>Hello World!!</h3>'
	};
});
*/

app.directive('medianChart', function(){
	function link(scope, el){
		var dataArray=[20, 40, 50, 60, 10, 10, 10];
		var width = 500;
		var height = 800;

		var widthScale = d3.scale.linear()
			.domain([0, 60])
			.range([0, width]);

		var heighScale = d3.scale.linear()
			.domain([0,60])
			.range([0, height]);

		var color = d3.scale.linear()
			.domain([0, 60])
			.range(["red", "blue"]);

		var axis = d3.svg.axis()
			.ticks(5)
			.scale(widthScale);

		var canvas = d3.select("body")
			.append("svg")
			.attr("width", width)
			.attr("height", height)
			.append("g")
			.attr("transform", "translate(20, 0)") //flytta, rotera o sånt

		var bars = canvas.selectAll("rect")
			.data(dataArray)
			.enter()
			.append("rect")
			.attr("width", function(d) { return widthScale(d); })
			.attr("height", 50)
			.attr("fill", function(d) { return color(d) })
			.attr("y", function(d, i) { return i * 100 });

		canvas.append("g")
			.attr("transform", "translate(0, 700)")
			.call(axis);

					}
	return {
		link: link,
		restrict: 'E'
	}
})
