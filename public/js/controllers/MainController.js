app.controller('MainController', ['$scope', function($scope){
}]);


/*
app.controller('MainController', ['$scope', function($scope){
    // controller "knows" nothing about donut charts
    $scope.shared = { data: [1] };
    $scope.chartClicked = function(){
        var n = Math.round(Math.random() * 9) + 1;
        $scope.shared.data = d3.range(n).map(function(d){ return Math.random(); });
    }
}]);
*/

