app.controller('CalendarController', ['$scope', '$rootScope', '$stateParams', 'Report',
    function($scope, $rootScope, $stateParams, Report){

        var CLIENT_ID = '711755136597-022n0vgnc4bhgot40ct6ghim4ge594vc.apps.googleusercontent.com';
        var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

        var projectId = $stateParams.projectId;

        handleCalAuthResult = function(authResult) {
            if (authResult && !authResult.error) {
                calendarApiCall();
            }
        }

        $scope.handleCalAuthClick = function(event) {
            gapi.auth.authorize({
                'client_id': CLIENT_ID,
                'scope': SCOPES,
                'immediate': false
            }, handleCalAuthResult);
            return false;
        }

        calendarApiCall = function() {

            $scope.calendars = [];

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

        $scope.calendarEventsApiCall = function() {

            $scope.calendarEvents = [];

            gapi.client.load('calendar', 'v3', function() {
                var request = gapi.client.calendar.events.list({
                    'calendarId': $scope.calendarSelected,
                    'timeMin': $scope.startDate.toISOString(),
                    'timeMax': $scope.endDate.toISOString(),
                    'singleEvents': true,
                    'orderBy': 'startTime'
                });
                request.execute(function(response){
                    $scope.$apply(function() {
                        for (i = 0; i < response.result.items.length; i++) {
                            var startTime = new Date(response.result.items[i].start.dateTime);
                            var endTime = new Date(response.result.items[i].end.dateTime);
                            var timeDiff = endTime.getTime() - startTime.getTime();

                            $scope.calendarEvents.push({
                                selected : false,
                                title : response.result.items[i].summary,
                                start : startTime.toDateString(),
                                duration : timeDiff/(1000*3600)
                            });
                        }
                    });
                });
            });
            $scope.calEventsFetched = true;
        };

        $scope.addEvent = function(calEvent) {

            calEvent.selected = true;
            var newReport = new Report();

            newReport.$save({
                project: projectId,
                user: window.localStorage.user_name.slice(1, -1),
                token: window.localStorage.access_token.slice(1, -1)
                },
                function(response) {
                angular.extend(newReport, {
                    id: response.id,
                    name: calEvent.title,
                    project: projectId,
                    time: calEvent.duration,
                    text: 'Imported from Google Calendar',
                    user: window.localStorage.user_name.slice(1, -1),
                    token: window.localStorage.access_token.slice(1, -1)
                });
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