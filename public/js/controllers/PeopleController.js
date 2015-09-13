app.controller('PeopleController', ['$scope', '$http', function($scope, $http){

    $scope.fetchPeople = function() {
        console.log("fetching data again")
        $http.get('/people').success(
            function(response){
                $scope.people = response;
                console.log("data fetched");
            }
        ).error(
            $scope.subheader = "Bad response"
        );
    };


    $scope.add = function() {
        console.log(JSON.stringify($scope.person));

        $http.post('/people', $scope.person).success(function(msg){
            if(msg.msg != 'ok'){
                console.log("Something went wrong when trying to add to the database");
            }
        });
    };

}]);