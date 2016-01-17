app.controller('ProjectController', ['$scope', '$rootScope', '$stateParams', '$filter', 'Report', 'Project',
    function($scope, $rootScope, $stateParams, $filter, Report, Project) {

        var projectId = $stateParams.projectId;
        $rootScope.reports = []

        updateChartData = function() {

            var reports = $rootScope.reports;

            $scope.set = {
                time: [], //REMOVE
                x: [], //REMOVE
                y: []
            };

            for (var i = 0; i < reports.length; i++) {
                $scope.set.x.push(reports[i].id); //REMOVE
                reports[i].time ? $scope.set.y.push(reports[i].time) : $scope.set.y.push(0);
            };
        }

        $scope.init = function() {
            $scope.project = Project.get({id:projectId,
                    user: window.localStorage.user_name.slice(1, -1),
                    token: window.localStorage.access_token.slice(1, -1)},
                function(resource) {
                    Report.query({
                            id:projectId,
                            user: window.localStorage.user_name.slice(1, -1),
                            token: window.localStorage.access_token.slice(1, -1)
                        },
                        function(response){
                            $rootScope.reports = response;
                            updateChartData();
                    });
                });
        };


        $scope.saveReport = function(elementData, elementId) {
            var report = new Report();
            angular.extend(report, {
                id: elementId,
                project: projectId,
                user: window.localStorage.user_name.slice(1, -1),
                token: window.localStorage.access_token.slice(1, -1)
            }, elementData);
            report.$update(function(response) {
                updateChartData();
            });
        };

        $scope.removeReport = function(report, rowIndex){
            $rootScope.reports.splice(rowIndex, 1);
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
                $rootScope.reports.push($scope.inserted);
            });
        };
    }]);