/**
 * Created by teddy on 13/10/15.
 */

angular.module('TimeReportApp')

    //.controller('LoginController', [ '$scope', 'Session', function ($scope, Session) {
    .controller('LoginController', function ($stateParams, $scope, Session, Authenticate, $timeout, $location) {
        var SCOPES = ["https://www.googleapis.com/auth/plus.me"];
        $scope.oauth_token = 'Not authorized yet.';
        $scope.tokenParam = $location.absUrl().split('?').pop();
        console.log('Token: ' + $scope.tokenParam.split('&')[0]);
        console.log('Username: ' + $scope.tokenParam.split('&')[1]);
        Session.setUser($scope.tokenParam.split('&')[1], $scope.tokenParam.split('&')[0], $scope.tokenParam.split('&')[2]);
/*
        $scope.login = function () {
           // Ask to the server, do your job and THEN set the user
           Session.Authorize(false, SCOPES);
           console.log('Loading Google+ API');
          // Session.setUser(temp); //Update the state of the user in the app
           return gapi.client.load('plus', 'v1', CallPlusApi);
        };
*/
        $scope.logout = function (){
            Session.logOutUser();
            window.location.href = '/#/home';
        };

        CallPlusApi = function() {
           fetchPlusProfile();
           //1000 milliseconds delay and then callCalendarEventsApi second time.
           //$timeout(fetchPlusProfile, 1000);
        };

        isNewUser = function(userId) {
           console.log("GETTING TOKEN")
           //LOL = gapi.auth.getToken();
           ////console.log(LOL);
           $scope.user = Authenticate.get({id:window.localStorage.userName, token:window.localStorage.accessToken}, function(response) {
               console.log("success (GET http://127.0.0.1:3000/api/user/" + userId + ")");
               return response;
           }, function(error) {
               console.log("error (GET http://127.0.0.1:3000/api/user/" + userId + ")");
           });
        };

        
        fetchPlusProfile = function() {
        
           var request = gapi.client.plus.people.get({'userId' : 'me'});
        
           Session.setUser([107337831363100578935, "Rasmus"]); //id name time?
        
           //if (isNewUser(window.localStorage.access_token)){
           //    console.log("IT IS A NEW USER =D")
           //}
        
           return request.execute(function(response) {
               console.log(response);
               $scope.oauth_token = response;
        
               console.log("TOKEN:");
               console.log($scope.oauth_token);
        
               //for (var i = 0; i < response.items.length; i++) {
               //    $scope.calendars.push({
               //        title : response.items[i].summary,
               //        id : response.items[i].id
               //    });
               //}
               //$scope.calendarsFetched = true;
           });
        };

        $scope.isLogedIn = function() {
            return Session.isLoggedIn();
        }


    });
    //}])