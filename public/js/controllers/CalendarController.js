app.controller('CalendarController', ['$scope', '$rootScope', '$stateParams', 'Report', 
function($scope, $rootScope, $stateParams, Report){
  
  var CLIENT_ID = '711755136597-022n0vgnc4bhgot40ct6ghim4ge594vc.apps.googleusercontent.com';
  var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

  var projectId = $stateParams.projectId;

  function handleCalAuthResult(authResult) {
    if (authResult && !authResult.error) {
        calendarApiCall();
    }
  }

  $scope.handleCalAuthClick=function (event) {
      gapi.auth.authorize({
        'client_id': CLIENT_ID,  
        'scope': SCOPES, 
        'immediate': false
      }, handleCalAuthResult);
      return false;
  }

  $scope.calendars = [];

  function calendarApiCall() {
      
      gapi.client.load('calendar', 'v3', function() {

          var request = gapi.client.calendar.calendarList.list({});
          request.execute(function(response){
              $scope.$apply(function() {
                for (var i = 0; i < response.items.length; i++) {
                  $scope.calendars.push({
                    title : response.items[i].summary, 
                    id : response.items[i].id
                  }); 
                }
              });
          });
      });
      $scope.calendarsFetched = true;
  } 
    
  listCalendarEvents = function() {

    var timeMin = $scope.startDate.toISOString();
    var timeMax = $scope.endDate.toISOString();

    //API: https://developers.google.com/google-apps/calendar/v3/reference/events/list
    var request = gapi.client.calendar.events.list({ 
      'calendarId': $scope.calendarSelected,
      'timeMin': timeMin,
      'timeMax': timeMax,
      'singleEvents': true,
      'orderBy': 'startTime'
    });

    var timeDiff;
    var startTime;
    var endTime;

    $scope.calEventsFetched = false;
    $scope.calendarEvents = [];
    
    //API: https://developers.google.com/google-apps/calendar/v3/reference/events#resource
    request.then(function(response) { 
      for (i = 0; i < response.result.items.length; i++) {
        startTime = new Date(response.result.items[i].start.dateTime);
        endTime = new Date(response.result.items[i].end.dateTime);
        timeDiff = endTime.getTime() - startTime.getTime();

        $scope.calendarEvents.push({
          selected : false,
          title : response.result.items[i].summary, 
          start : startTime.toDateString(), 
          duration : timeDiff/(1000*3600)
        });
      }
      $scope.calEventsFetched = true;
    });
  };

  $scope.fetchCalendarEvents = function() {
    return gapi.client.load('calendar', 'v3', listCalendarEvents);
  };

  $scope.authorize = function() {
    //Initiates the OAuth 2.0 authorization process
    gapi.auth.authorize({
      'client_id': CLIENT_ID, 
      'immediate': false,
      'response_type' : "token",
      'scope': SCOPES
    }); 
  };

  $scope.addEvent = function(event) {

    event.selected = true;

    var newReport = new Report();

    newReport.$save(function(response) {
      angular.extend(newReport, {id: response.id, name: event.title, project: projectId, time: event.duration, text: 'Imported from Google Calendar'});
      newReport.$update(function() {
        $rootScope.reports.push(newReport);
      });
    });
  }

  $scope.openDatePicker = function($event, opened) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope[opened] = true;
  };

  $scope.dateOptions = {
    startingDay: 1
  };
}]);