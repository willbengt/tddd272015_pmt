app.controller('ProjectController', [
  '$scope', 
  '$stateParams', 
  '$http', 
  '$filter', 
  'Report', 
  'Project', 
  function(
    $scope, 
    $stateParams, 
    $http, 
    $filter,
    Report, 
    Project
  ){
  var projectId = $stateParams.projectId;
  
  //var rootUrl = "http://127.0.0.1:3000/"
  var rootUrl = "http://localhost:3000/"

 	$scope.project = [];
  $scope.reports = [];

  loadProject = function() {
    $scope.project = Project.get({id:projectId}, function() {
      console.log("success (GET " + rootUrl + "api/projects/" + projectId + ")");
    }, function(error) {
      console.log("error (GET " + rootUrl + "api/projects/" + projectId + ")");
    });
  };

  loadReports = function() {
  	$http.get('/report').success(function(response) {
      console.log("success (GET " + rootUrl + "report)");
      $scope.reports = $filter('filter')(response, {project: $scope.project.id}); 

      $scope.tableInformation = response;
      $scope.set.time = [];
      $scope.set.x = [];
      _.times($scope.tableInformation.length, function(n) {
        if ($scope.tableInformation[n].project == projectId) {
          $scope.set.time.push($scope.tableInformation[n].time);
          $scope.set.x.push(n);
        }
      });
    }).error(function() {
      console.log("error (GET " + rootUrl + "report)");
    });
  };

  $scope.init = function() {
    loadProject();
    loadReports();
  };

  var CLIENT_ID = '711755136597-022n0vgnc4bhgot40ct6ghim4ge594vc.apps.googleusercontent.com';
  var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
  $scope.calendarsFetched = false;
  $scope.calEventsFetched = false;

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
    
  listCalendarEvents = function() {
    $scope.calendarEvents = []; 
    var timeMin = $scope.startDate.toISOString();

    //API: https://developers.google.com/google-apps/calendar/v3/reference/events/list
    var request = gapi.client.calendar.events.list({ 
      'calendarId': $scope.calendarSelected,
      'timeMin': timeMin,
      'singleEvents': true,
      'maxResults': $scope.numberOfEvents,
      'orderBy': 'startTime'
    });

    var timeDiff;
    var startTime;
    var endTime;
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

  $scope.fetchCalendars = function() {
    return gapi.client.load('calendar', 'v3', listCalendars);
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

    var data = {
      name: event.title,
      project: projectId,
      time: event.duration,
      text: 'Imported from Google Calendar'
    };

    $http.post('/report', data).success(function(response) {
      console.log("success (POST http://localhost:3000/report)");
    }).error(function() {
      console.log("error (POST http://localhost:3000/report)");
    });

    loadReports();
  }

  $scope.datePickerOpen = false;

  $scope.openDatePicker = function($event) {
    $scope.datePickerOpen = true;
  };

  $scope.dateOptions = {
    startingDay: 1
  };

  $scope.datePickerOpen = false;

  $scope.set = {
    time: [],
    x: []
  };
}]);