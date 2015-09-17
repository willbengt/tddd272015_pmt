app.controller('PeopleController', ['$scope', '$filter', '$http', function($scope, $filter, $http){

$scope.users = [
    {id: 1, name: 'awesome user1', email: 'email1'},
    {id: 2, name: 'awesome user2', email: 'email2'},
    {id: 3, name: 'awesome user3', email: 'email3'}
  ]; 

  $scope.savePerson = function(data, id) {
    return $http.put('/people/' + id, data);
  };

  $scope.removeUser = function(id) {
    $scope.users.splice(id, 1);
  };
  
  $scope.addPerson = function() {
    $scope.inserted = {
      name: '',
      email: ''
    };

    return $http.post('/people', $scope.inserted).success(function(response) {
      $scope.inserted.id = response.id;
      $scope.users.push($scope.inserted);
    });
  };
  
  $scope.people = [];
  $scope.loadPeople = function() {
    return $http.get('/people').success(function(data) {
      $scope.people = data;
    });
  };

}]);