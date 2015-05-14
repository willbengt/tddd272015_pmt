var app = angular.module("TimeReportApp", []);

var authApp = angular.module('Authentication', ['ui.router']);

authApp.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
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

authApp.controller('LoginController', function($scope){
    window.location.href = "https://api.imgur.com/oauth2/authorize?client_id=" + "772e4e0d393959b" + "&response_type=token"
});

authApp.controller("SecureController", function($scope) {

    $scope.accessToken = JSON.parse(window.localStorage.getItem("imgur")).oauth.access_token;

});