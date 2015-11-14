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

            .state('people', {
                url: '/people',
                templateUrl: '/views/people.html',
                controller: 'PeopleController'
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

        $urlRouterProvider.otherwise('/views/home');
    }])

    .run(['$rootScope', '$location', 'Session', function ($rootScope, $location, Session) {
        $rootScope.$on('$routeChangeStart', function (event) {

            if (!Session.isLoggedIn()) {
                console.log('DENY');
                event.preventDefault();
                $location.path('/login');
            }
            else {
                console.log('ALLOW');
                $location.path('/home');
            }
        });
        editableOptions.theme = 'bs3'; // bootstrap3 theme.

    }]);
/*
app.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. 
});
*/
