
angular.module('TimeReportApp')

    .controller('ProjectController', ['$scope', '$stateParams', '$filter', 'Report', 'Project',
        function($scope, $stateParams, $filter, Report, Project) {

            var CLIENT_ID = '711755136597-022n0vgnc4bhgot40ct6ghim4ge594vc.apps.googleusercontent.com';
            var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
            var projectId = $stateParams.projectId;
            $scope.reports = [];


            updateChartData = function() {
                $scope.y = [];
                var reports = $scope.reports;

                for (var i = 0; i < reports.length; i++) {
                    reports[i].time ? $scope.y.push(reports[i].time) : $scope.y.push(0);
                };

                $scope.totalTime = 0;

                for (var i = 0;i < $scope.y.length; i++) {
                    $scope.totalTime += parseFloat($scope.y[i]);
                }
            }

            $scope.init = function() {
                Project.get({id:projectId,
                        user: window.localStorage.user_name.slice(1, -1),
                        token: window.localStorage.access_token.slice(1, -1)},
                    function(resource) {
                        $scope.project = resource;
                        Report.query({
                                id:projectId,
                                user: window.localStorage.user_name.slice(1, -1),
                                token: window.localStorage.access_token.slice(1, -1)
                            },
                            function(response){
                                $scope.reports = response;
                                updateChartData();
                            });
                    });
            };

            $scope.validateName = function(data) {
                if (!data) {return "Title is required";}
            };

            $scope.validateTime = function(newData, oldData) {
                if (!newData) {return "Time is required";} 
                if (isNaN(parseFloat(newData)) || parseFloat(newData) < 0) {return "The time must be a number greater or equal to zero";}

                var oldTotalTime = 0;

                for (var i = 0;i < $scope.y.length; i++) {
                    oldTotalTime += parseFloat($scope.y[i]);
                }

                var newTotalTime = oldTotalTime + parseFloat(newData) - parseFloat(oldData ? oldData : 0);

                if(newTotalTime > $scope.project.time) {
                    return "Total reports time exceeding max project time";
                }
            };

            $scope.saveReport = function(newData, oldData) {

                var report = new Report();
                angular.extend(report, {
                    id: oldData.id,
                    project: projectId,
                    user: window.localStorage.user_name.slice(1, -1),
                    token: window.localStorage.access_token.slice(1, -1)
                }, newData);
                report.$update(function(response) {
                    updateChartData();
                });
            };

            $scope.removeReport = function(report, rowIndex){
                $scope.reports.splice(rowIndex, 1);
                report.$delete({
                    project: projectId,
                    user: window.localStorage.user_name.slice(1, -1),
                    token: window.localStorage.access_token.slice(1, -1)
                }, function(response) {
                    updateChartData();
                });
            };

            $scope.addReport = function() {
                $scope.inserted = new Report();

                $scope.inserted.$save({
                    project: projectId,
                    user: window.localStorage.user_name.slice(1, -1),
                    token: window.localStorage.access_token.slice(1, -1)
                }, function(response) {
                    $scope.inserted.id = response.id;
                    $scope.reports.push($scope.inserted);
                });
            };

            $scope.handleCalAuthClick = function(event) {
                gapi.auth.authorize({
                    'client_id': CLIENT_ID,
                    'scope': SCOPES,
                    'immediate': false
                }, handleCalAuthResult);
                return false;
            }

            handleCalAuthResult = function(authResult) {
                if (authResult && !authResult.error) {
                    calendarApiCall();
                }
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
                            $scope.reports.push(newReport);
                            updateChartData();
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