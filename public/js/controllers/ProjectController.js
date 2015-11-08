app.controller('ProjectController', ['$scope', '$stateParams', '$http', '$filter', '$timeout', 'Project', function($scope, $stateParams, $http, $filter, $timeout, Project){
  var projectId = $stateParams.projectId;

 	$scope.project = [];

  loadProject = function() {
    $scope.project = Project.get({id:projectId}, function() {
      console.log("success (GET http://localhost:3000/api/projects/" + projectId + ")");
    }, function(error) {
      console.log("error (GET http://localhost:3000/api/projects/" + projectId + ")");
    });
  };

  loadReports = function() {
  	$http.get('/report').success(function(response) {
      console.log("success (GET http://localhost:3000/report)");
      $scope.reports = $filter('filter')(response, {project: $scope.project.id}); 
    }).error(function() {
      console.log("error (GET http://localhost:3000/report)");
    });
  };

  $scope.init = function() {
    loadProject();
    loadReports();
  };

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
    
    var timeZoneOffset = (new Date()).getTimezoneOffset() * 60000;
    var timeMin = (new Date($scope.startDate - timeZoneOffset)).toISOString();

    //API: https://developers.google.com/google-apps/calendar/v3/reference/events/list
    var request = gapi.client.calendar.events.list({ 
      'calendarId': $scope.calendarSelected,
      'timeMin' : timeMin,
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

  $scope.openDatePicker = function($event) {
    $scope.datePickerOpen = true;
  };

  $scope.dateOptions = {
    startingDay: 1
  };

  $scope.datePickerOpen = false;

  $scope.trollData = [
    {x: 1,y: 5},
    {x: 2,y: 6},
    {x: 3,y: 7},
    {x: 4,y: 10},
    {x: 5,y: 10},
    {x: 6,y: 3},
    {x: 7,y: 5},
    {x: 8,y: 7},
    {x: 9,y: 5},
    {x: 10,y: 3}
  ];

  $scope.data = [
    {name: "Greg", score: 98},
    {name: "Ari", score: 96},
    {name: 'Q', score: 75},
    {name: "Loser", score: 48}
  ];

  //  $scope.fetchProject = [];

  console.log("Trollmessage:")
  console.log($scope.data);

}]);