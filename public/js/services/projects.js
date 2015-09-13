
angular.module('TimeReportApp')

    .factory('Project', function ProjectFactory($Resource){
        return $Resource('/project/:id', {}, {});
    });