angular.module('TimeReportApp').
    controller('MainCtrl', ['$scope', 'Session', '$location', function ($scope, Session, $location) {

        $scope.$watch(Session.isLoggedIn, function (value, oldValue) {

            if (!value && oldValue) {
                console.log("Disconnect");
                $location.path('/login');
            }

            if (value) {
                console.log("Connect");
                //Do something when the user is connected
            }

        }, true);

    }]);
