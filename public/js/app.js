var app = angular.module("TimeReportApp", ['ui.router', 'angular-oauth2']).config([
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

            .state('oauth_callback', {
                url: '/oauth_callback',
                templateUrl: '/views/oauth_callback.html',
                controller: 'SessionController'
            })

            .state('login', {
                url: '/login',
                templateUrl: '/views/login_test.html',
                controller: 'SessionController'
            })

            .state('secure', {
                url: '/secure',
                templateUrl: '/views/secure_test.html',
                controller: 'SecureController'
            })

            .state('calendar', {
                url: '/calendar',
                templateUrl: '/views/calendar.html',
                controller: 'CalendarController'
            });

        $urlRouterProvider.otherwise('/views/home.html');
    }]);

app.controller("SecureController", function($scope){
    $scope.accessToken = JSON.parse(window.localStorage.getItem("imgur")).oauth.access_token;
    $scope.test_msg = "Nothing";
});