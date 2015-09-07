app.controller('CalendarController', ['$scope', 'eventService', function($scope, eventService){
  var CLIENT_ID = '711755136597-5k4ijen3f7j0003088jjimt8knlre2cm.apps.googleusercontent.com';
  var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

  var calendarFetcher = {
    results: ["empty"],

    fetch: function() {
      console.log("$(this).results = " + JSON.stringify($(this).results));
      //console.log("$this.results = " + JSON.stringify($this.results));
      console.log("this.results = " + JSON.stringify(this.results));
      
      /*
      gapi.client.calendar.calendarList.list({}).then(function(response) {
        this.results.push(response.result);
        console.log(response.result.items[1].summary);
      }, function(reason) {
        console.error(name, 'was not fetched:', response.result.error.message);
      }, this);*/
    }
  };

  listCalendars = function() {
    var request = gapi.client.calendar.calendarList.list({});
    var calendars = [];
    var singleCalendar = [];

    request.execute(function(response) {
      
      appendPre("\n-----CALENDARS-----\n" );

      for (var i = 0; i < response.items.length; i++) {
        singleCalendar = [
          {title : response.items[i].summary}, 
          {id : response.items[i].id} 
        ];
        appendPre(JSON.stringify(singleCalendar) + '\n');
        calendars.push(singleCalendar);
      }
    });
  };
           
  listCalendarEvents = function() {
    var maxResults = 2;
    var time_min = "2015-06-01T00:00:00+02:00";
    var calendarId = "williambengtsson.com_nh203r5l6mbf5cp2c6hp2crjkk@group.calendar.google.com";
    
    //API: https://developers.google.com/google-apps/calendar/v3/reference/events/list
    var request = gapi.client.calendar.events.list({ 
      'calendarId': calendarId,
      'timeMin': time_min,
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': maxResults,
      'orderBy': 'startTime'
    });

    //API: https://developers.google.com/google-apps/calendar/v3/reference/events#resource
    request.then(function(response) { 
      var events = []; 
      var singleEvent = [];

      appendPre("\n-----EVENTS-----\n" );
      
      for (i = 0; i < maxResults; i++) {
        singleEvent = [
          {title : response.result.items[i].summary}, 
          {start : response.result.items[i].start.dateTime}, 
          {end : response.result.items[i].end.dateTime}
        ];
        appendPre(JSON.stringify(singleEvent) + '\n');
        events.push(singleEvent);
      }
      eventService.events = events;
      console.log("1. eventService.events = " + JSON.stringify(eventService.events));
    });
    console.log("2. eventService.events = " + JSON.stringify(eventService.events));
  };

  appendPre = function(message) {
    var pre = document.getElementById('output');
    var textContent = document.createTextNode(message);
    pre.appendChild(textContent);
  }

  callbackHandler = function(authResult) {
    if (authResult && !authResult.error) {
      console.log("Authorization successful");
      gapi.client.load('calendar', 'v3', listCalendars);
      gapi.client.load('calendar', 'v3', listCalendarEvents);
      gapi.client.load('calendar', 'v3', calendarFetcher.fetch);
    } else {
      console.log("Authorization not successful");
    }
  };

  $scope.authorize = function() {
    //Initiates the OAuth 2.0 authorization process
    gapi.auth.authorize({
      'client_id': CLIENT_ID, 
      'immediate': false,
      'response_type' : "token",
      'scope': SCOPES, 
    }, callbackHandler); 
  };
}]);