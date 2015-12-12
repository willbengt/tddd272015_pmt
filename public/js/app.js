var app = angular.module("TimeReportApp", ['ui.router', 'angular-oauth2', 'xeditable', 'ui.bootstrap', 'ngResource'])

    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/views/home.html',
                controller: 'LoginController'
            })

            .state('reports', {
                url: '/reports',
                templateUrl: '/views/reports.html',
                controller: 'ReportController'
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

            .state('calendar', {
                url: '/calendar',
                templateUrl: '/views/calendar.html',
                controller: 'CalendarController'
            });

        $urlRouterProvider.otherwise('/views/home');
    }])

    .run(function(editableOptions, $rootScope, Session, $location, $state) {
        console.log("RRRUNNNNN");
        Session.setUser(null);
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){

            console.log("isLoggedIn(): ");
            console.log(Session.isLoggedIn());

             if(!$state.is('home')) {
                if (!Session.isLoggedIn()) {
                    console.log('DENY');
                    event.preventDefault();
                    $location.path('/views/home');
                }
                else {
                    console.log('Allow' + Session.isLoggedIn());
                }
            }
            $rootScope.$state = $state;
            // transitionTo() promise will be rejected with
            // a 'transition prevented' error
        });
        editableOptions.theme = 'bs3'; // bootstrap3 theme.

    });
