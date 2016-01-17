app.controller('ProjectController', ['$scope', '$rootScope', '$stateParams', '$filter', 'Report', 'Project',
    function($scope, $rootScope, $stateParams, $filter, Report, Project) {

        var projectId = $stateParams.projectId;
        $rootScope.reports = []

        $scope.init = function() {
            $scope.project = Project.get({id:projectId,
                    user: window.localStorage.user_name.slice(1, -1),
                    token: window.localStorage.access_token.slice(1, -1)},
                function(resource) {
                    $scope.prjtime = resource.time;
                    loadReports();
                });
        };

        loadReports = function() {
            console.log('Loading reports')
            Report.query({
                    id:projectId,
                    user: window.localStorage.user_name.slice(1, -1),
                    token: window.localStorage.access_token.slice(1, -1)
                },
                function(response){
                    $rootScope.reports = response;
                    $scope.tableInformation = response;
                    console.log('TableInformation: ' + $scope.tableInformation)
                    $scope.set.time = [];
                    $scope.set.x = [];
                    _.times($scope.tableInformation.length, function (n) {
                        if ($scope.tableInformation[n].project == projectId) {
                            $scope.set.time.push($scope.tableInformation[n].time);
                            $scope.set.x.push(n);
                        }
                    });
                });
        };

        //loadReports = function() {
        //    console.log('Loading reports')
        //    $scope.tableInformation = Report.query({
        //            id:projectId,
        //            user: window.localStorage.user_name.slice(1, -1),
        //            token: window.localStorage.access_token.slice(1, -1)
        //        },
        //        function(response) {
        //            $rootScope.reports = $filter('filter')(response, {project: projectId});
        //            console.log('Load reports: ' + response);
        //            $scope.tableInformation = response;
        //            console.log('TableInformation: ' + $scope.tableInformation)
        //            $scope.set.time = [];
        //            $scope.set.x = [];
        //            _.times($scope.tableInformation.length, function (n) {
        //                if ($scope.tableInformation[n].project == projectId) {
        //                    $scope.set.time.push($scope.tableInformation[n].time);
        //                    $scope.set.x.push(n);
        //                }
        //            });
        //        });
        //};


        //$scope.init = function() {
        //  $scope.project = Project.get({id:projectId}, function(resource) {
        //    $scope.prjtime = resource.time;
        //    loadReports();
        //  });
        //
        //};


        $scope.saveReport = function(elementData, elementId) {
            var report = new Report();
            angular.extend(report, {
                id: elementId,
                project: projectId,
                user: window.localStorage.user_name.slice(1, -1),
                token: window.localStorage.access_token.slice(1, -1)
            }, elementData);
            report.$update();
        };

        $scope.removeReport = function(report, rowIndex){
            $rootScope.reports.splice(rowIndex, 1);
            report.$delete({
                project: projectId,
                user: window.localStorage.user_name.slice(1, -1),
                token: window.localStorage.access_token.slice(1, -1)
            });
        };

        $scope.addReport = function() {
            $scope.inserted = new Report();
            $scope.inserted.$save({
                user: window.localStorage.user_name.slice(1, -1),
                token: window.localStorage.access_token.slice(1, -1),
                project: projectId
            }, function(response) {
                $scope.inserted.id = response.id;
                $rootScope.reports.push($scope.inserted);
            });
        };

        $scope.set = {
            time: [],
            x: []
        };
    }]);