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

  loadReports = function() {
    Report.query(function(response) {
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
    });
  };

  $scope.init = function() {
    $scope.project = Project.get({id:projectId}, function(resource) {
      $scope.prjtime = resource.time;
    });
    loadReports();
  };

  $scope.saveReport = function(elementData, elementId) {
    var report = new Report();
    angular.extend(report, {id: elementId, project: projectId}, elementData);
    report.$update();
  };

  $scope.removeReport = function(report, rowIndex){
    $scope.reports.splice(rowIndex, 1);
    report.$delete();
  };

  $scope.addReport = function() {
    $scope.inserted = new Report();

    $scope.inserted.$save(function(response) {
      $scope.inserted.id = response.id;
      $scope.reports.push($scope.inserted);
    });
  };

  var CLIENT_ID = '711755136597-022n0vgnc4bhgot40ct6ghim4ge594vc.apps.googleusercontent.com';
  var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
  $scope.calendarsFetched = false;
  $scope.calEventsFetched = false;

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