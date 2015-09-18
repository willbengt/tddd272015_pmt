app.controller('PeopleController', ['$scope', '$http', function($scope, $http){

  $scope.people = [];

  $scope.loadPeople = function() {
    return $http.get('/people').success(function(data) {
      $scope.people = data;
    });
  };

  $scope.savePerson = function(data, id) {
    return $http.put('/people/' + id, data);
  };

  $scope.removePerson = function(id, rowIndex) {
    $scope.people.splice(rowIndex, 1);
    return $http.delete('/people/' + id);
  };
  
  $scope.addPerson = function() {
    $scope.inserted = {
      name: '',
      email: ''
    };

    return $http.post('/people', $scope.inserted).success(function(response) {
      $scope.inserted.id = response.id;
      $scope.people.push($scope.inserted);
    });
  };
}]);