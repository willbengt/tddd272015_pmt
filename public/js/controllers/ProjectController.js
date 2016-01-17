app.controller('ProjectController', ['$scope', '$rootScope', '$stateParams', '$filter', 'Report', 'Project', 
function($scope, $rootScope, $stateParams, $filter, Report, Project) {

  loadReports = function() {
    Report.query(function(response) {
        $rootScope.reports = $filter('filter')(response, {project: $stateParams.projectId});
        var reports = $rootScope.reports;
        $scope.set.y = [];
        $scope.set.x = [];
        _.times(reports.length, function (n) {
            $scope.set.y.push(reports[n].time);
            $scope.set.x.push(n);
        });
    });
  };

        $scope.init = function() {
            $scope.project = Project.get({
                    id: $stateParams.projectId,
                    user: window.localStorage.user_name.slice(1, -1),
                    token: window.localStorage.access_token.slice(1, -1)},
                function(resource) {
                    $scope.prjtime = resource.time;
                });
            loadReports();
        };

        $scope.saveReport = function(elementData, elementId) {
            var report = new Report();
            angular.extend(report, {id: elementId, project: $stateParams.projectId}, elementData);
            report.$update();
        };

        $scope.removeReport = function(report, rowIndex){
            $rootScope.reports.splice(rowIndex, 1);
            report.$delete();
        };

        $scope.addReport = function() {
            $scope.inserted = new Report();

            $scope.inserted.$save(function(response) {
                $scope.inserted.id = response.id;
                $rootScope.reports.push($scope.inserted);
            });
        };

        $scope.set = {
            y: [],
            x: []
        };
    }]);