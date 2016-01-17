
angular.module('TimeReportApp')

    .controller('LoginController', function ($stateParams, $scope, Session, Authenticate, $timeout, $location) {
        $scope.tokenParam = $location.absUrl().split('?').pop();
        Session.setUser($scope.tokenParam.split('&')[1], $scope.tokenParam.split('&')[0], $scope.tokenParam.split('&')[2]);

        $scope.logout = function (){
            Session.logOutUser();
            window.location.href = '/#/home';
        };

        isNewUser = function() {
            $scope.user = Authenticate.get({
                    id:window.localStorage.userName,
                    token:window.localStorage.accessToken},
                function(response) {
                    return response;
                });
        };

        $scope.isLogedIn = function() {
            return Session.isLoggedIn();
        }
    });

