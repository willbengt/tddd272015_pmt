app.controller('ProjectController', [
  '$scope', 
  '$stateParams',  
  '$filter', 
  'Report', 
  'Project', 
  function(
    $scope, 
    $stateParams,  
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
    $scope.project = Project.get({id:projectId}, function(resource) {
      $scope.prjtime = resource.time;
      console.log("success (GET " + rootUrl + "api/projects/" + projectId + ")");
    }, function(error) {
      console.log("error (GET " + rootUrl + "api/projects/" + projectId + ")");
    });
  };

  loadReports = function() {
    Report.query(function(response) {
      console.log("success (GET " + rootUrl + "api/reports)");
      $scope.reports = $filter('filter')(response, {project: projectId}); 
      $scope.tableInformation = response;
      $scope.set.time = [];
      $scope.set.x = [];
      _.times($scope.tableInformation.length, function(n) {
        if ($scope.tableInformation[n].project == projectId) {
          $scope.set.time.push($scope.tableInformation[n].time);
          $scope.set.x.push(n);
        }
      });
    }), function(error) {
      console.log("error (GET " + rootUrl + "api/reports)");
    };
  };

  $scope.init = function() {
    loadProject();
    loadReports();
  };

  $scope.saveReport = function(elementData, elementId) {
    var report = new Report();

    angular.extend(report, {id: elementId, project: projectId}, elementData);

    report.$update(function() {  
      console.log("success (PUT " + rootUrl + "api/reports/" + elementId + ")");
    }, function(error) {
      console.log("error (PUT " + rootUrl + "api/reports/" + elementId + ")");
    });
  };

  $scope.removeReport = function(report, rowIndex){
    $scope.reports.splice(rowIndex, 1);
    report.$delete(function() {
      console.log("success (DELETE " + rootUrl + "api/projects/" + report.id + ")");
    }, function(error) {
      console.log("error (DELETE " + rootUrl + "api/projects/" + report.id + ")");
    });
  };

  $scope.addReport = function() {
    $scope.inserted = new Report();

    return $scope.inserted.$save(function(response) {
      console.log("success (POST " + rootUrl + "api/reports)");
      $scope.inserted.id = response.id;
      $scope.reports.push($scope.inserted);
    }, function(error) {
      console.log("error (POST " + rootUrl + "api/reports)");
    });
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

    var newReport = new Report();

    newReport.$save(function(response) {
      angular.extend(newReport, {id: response.id, name: event.title, project: projectId, time: event.duration, text: 'Imported from Google Calendar'});
      newReport.$update(function() {
        $scope.reports.push(newReport);
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

  $scope.set = {
    time: [],
    x: []
  };
}]);