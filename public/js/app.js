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

            .state('login', {
                url: '/login',
                templateUrl: '/views/login_test.html',
                controller: 'SessionController'
            })

            .state('secure', {
                url: '/secure',
                templateUrl: '/views/secure_test.html',
                controller: 'SecureController'
            });

        $urlRouterProvider.otherwise('/views/home.html');
    }]);

app.controller('SessionController', function($scope){

    $scope.login = function() {
        window.location.href = "https://api.imgur.com/oauth2/authorize?client_id=" + "772e4e0d393959b" + "&response_type=token";
    }

    $scope.logout = function() {
        window.localStorage.removeItem("imgur");
    }
});

app.controller("SecureController", function($scope){
    $scope.accessToken = JSON.parse(window.localStorage.getItem("imgur")).oauth.access_token;
    $scope.test_msg = "Nothing";
});