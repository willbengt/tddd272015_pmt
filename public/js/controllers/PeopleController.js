app.controller('PeopleController', ['$scope', '$http', function($scope, $http){

    $scope.add = function() {
        console.log(JSON.stringify($scope.person));

        $http.get('/people').success(function(msg) {
            if(msg.msg != 'ok'){
                $scope.msg = 'Something went wrong when trying to add to the database';
            }
        });
    };

}]);