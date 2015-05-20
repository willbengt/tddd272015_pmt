var app = angular.module("TimeReportApp", ['ui.router']).config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

	  $stateProvider
	    .state('home', {
	      url: '/home',
	      templateUrl: '/views/home.html',
	      controller: 'MainController'
	    })

	    .state('reports', {
	      url: '/reports',
	      templateUrl: '/views/reports.html',
	      controller: 'ReportController'
	    })
          
        .state('login', {
            url: '/login',
            templateUrl: 'login_test.html',
            controller: 'LoginController'
        })

        .state('secure', {
            url: '/secure',
            temlpateUrl: 'secure_test',
            controller: 'SecureController'
        });
    $urlRouterProvider.otherwise('/login');

});

app.controller('LoginController', function($scope){
    window.location.href = "https://api.imgur.com/oauth2/authorize?client_id=" + "772e4e0d393959b" + "&response_type=token"
});

app.controller("SecureController", function($scope){
    $scope.accessToken = JSON.parse(window.localStorage.getItem("imgur")).oauth.access_token;
});