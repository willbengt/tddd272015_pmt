// var app = angular.module('TimeReportApp', [])


app.directive('donutChart', function(){
    function link(scope, el){
        d3.select(el[0]).append('svg')
    }
    return {
        link: link,
        restrict: 'E'
    }
})
