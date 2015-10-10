app.controller('CalendarController', ['$scope', '$timeout', function($scope, $timeout){
  var CLIENT_ID = '711755136597-5k4ijen3f7j0003088jjimt8knlre2cm.apps.googleusercontent.com';
  var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

  $scope.calendarsFetched = false;

  $scope.calendars = [];
  listCalendars = function() {

    var request = gapi.client.calendar.calendarList.list({});
    var singleCalendar = [];

    $scope.calendars = [];

    return request.execute(function(response) {

      for (var i = 0; i < response.items.length; i++) {
        $scope.calendars.push({
          title : response.items[i].summary, 
          id : response.items[i].id
        }); 
      }
      $scope.calendarsFetched = true;
    });
  };
    
  $scope.calendarEvents = [];         
  listCalendarEvents = function() {
    var time_min = "2015-06-01T00:00:00+02:00";
    
    //API: https://developers.google.com/google-apps/calendar/v3/reference/events/list
    var request = gapi.client.calendar.events.list({ 
      'calendarId': $scope.calendarSelected,
      'timeMin': time_min,
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': $scope.numberOfEvents,
      'orderBy': 'startTime'
    });

    $scope.calendarEvents = []; 

    //API: https://developers.google.com/google-apps/calendar/v3/reference/events#resource
    request.then(function(response) { 
      
      for (i = 0; i < $scope.numberOfEvents; i++) {
        $scope.calendarEvents.push({
          title : response.result.items[i].summary, 
          start : response.result.items[i].start.dateTime, 
          end : response.result.items[i].end.dateTime
        });
      }
    });
  };

  callCalendarApi = function() {
    return gapi.client.load('calendar', 'v3', listCalendars);
  };

  callCalendarEventsApi = function() {
    return gapi.client.load('calendar', 'v3', listCalendarEvents);
  };

  $scope.fetchCalendars = function() {
    callCalendarApi();
    //1000 milliseconds delay and then callCalendarApi second time. 
    $timeout(callCalendarApi, 1000); 
  };

  $scope.fetchCalendarEvents = function() {
    callCalendarEventsApi();
    //1000 milliseconds delay and then callCalendarEventsApi second time. 
    $timeout(callCalendarEventsApi, 1000); 
  };

  $scope.authorize = function() {
    //Initiates the OAuth 2.0 authorization process
    gapi.auth.authorize({
      'client_id': CLIENT_ID, 
      'immediate': false,
      'response_type' : "token",
      'scope': SCOPES, 
    }); 
  };
}]);