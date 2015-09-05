app.controller('CalendarController', ['$scope', function($scope){
  var CLIENT_ID = '711755136597-5k4ijen3f7j0003088jjimt8knlre2cm.apps.googleusercontent.com';

  var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

  $scope.authorize = function() {
    //Initiates the OAuth 2.0 authorization process
    gapi.auth.authorize({
      'client_id': CLIENT_ID, 
      'immediate': false,
      'response_type' : "token",
      'scope': SCOPES, 
    }); 
  }
}]);