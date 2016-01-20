var app = angular.module("TimeReportApp", ['ui.router', 'angular-oauth2', 'xeditable', 'ui.bootstrap', 'ngResource', 'checklist-model'])

    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider) {

        $httpProvider.interceptors.push('ResourceInterceptor');
        
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/views/home.html',
                controller: 'LoginController'
            })

            .state('users', {
                url: '/users',
                templateUrl: '/views/users.html',
                controller: 'UserController'
            })

            .state('projects', {
                url: '/projects',
                templateUrl: '/views/projects.html',
                controller: 'ProjectsController'
            })

            .state('project', {  
                url: '/project/:projectId', 
                templateUrl: '/views/project.html',  
                controller: 'ProjectController'
            })
    }])

    .run(function(editableOptions, $rootScope, Session, $location, $state) {
        Session.setUser(null);
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){

             if(!$state.is('home')) {
                if (!Session.isLoggedIn()) {
                    event.preventDefault();
                    $location.path('/#/home');
                }
            }
            $rootScope.$state = $state;
        });
        editableOptions.theme = 'bs3'; 
    });
