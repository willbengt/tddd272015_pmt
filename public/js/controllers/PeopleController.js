app.controller('PeopleController', ['$scope', '$state', function($scope, $state){

    $scope.isCurrentState = $state.is("people");

    $scope.add = function() {
        console.log($state);
        console.log(JSON.stringify($scope.person));
    };

}]);