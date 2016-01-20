
angular.module('TimeReportApp')

    .controller('LoginController', ['$scope', '$location', 'Session', 'Authenticate',
        function ($scope, $location, Session, Authenticate) {
            $scope.tokenParam = $location.absUrl().split('?').pop();
            Session.setUser($scope.tokenParam.split('&')[1], $scope.tokenParam.split('&')[0], $scope.tokenParam.split('&')[2]);

            $scope.logout = function (){
                Session.logOutUser();
            };

            isNewUser = function() {
                $scope.user = Authenticate.get({
                        id:window.localStorage.userName,
                        token:window.localStorage.accessToken},
                    function(response) {
                        return response;
                    });
            };

            $scope.isLoggedIn = function() {
                return Session.isLoggedIn();
            }
      }]);

