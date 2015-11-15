app.controller('PeopleController', ['$scope', '$http', '$filter', function($scope, $http, $filter){

  $scope.users = [];
  loadUsers = function() {
    return $http.get('/people').success(function(data) {
      console.log("success (GET http://localhost:3000/people)");
      $scope.users = data;
    }).error(function() {
      console.log("error (GET http://localhost:3000/people)");
    });
  };

  $scope.projects = [];
  loadProjects = function() {
    console.log("loadProjects");
    return $http.get('/api/projects').success(function(data) {
      console.log("success (GET http://localhost:3000/api/projects)");
      $scope.projects = data;
    }).error(function() {
      console.log("error (GET http://localhost:3000/api/projects)");
    });
  };

  $scope.init = function() {
    loadUsers();
    loadProjects();
  };

  $scope.showProject = function(user) {
    if(user.project && $scope.projects.length) {
      var selected = $filter('filter')($scope.projects, {id: user.project});
      return selected.length ? selected[0].name : 'Not set';
    } else {
      return 'Not set';
    }
  };

  $scope.saveUser = function(data, id) {
    return $http.put('/people/' + id, data).success(function(response) {
      console.log("success (PUT http://localhost:3000/people/" + id + ")");
    }).error(function() {
      console.log("error (PUT http://localhost:3000/people/" + id + ")");
    });
  };

  $scope.removeUser = function(id, rowIndex) {
    $scope.users.splice(rowIndex, 1);
    return $http.delete('/people/' + id).success(function(response) {
      console.log("success (DELETE http://localhost:3000/people/" + id + ")");
    }).error(function() {
      console.log("error (DELETE http://localhost:3000/people/" + id + ")");
    });
  };
  
  $scope.addUser = function() {
    $scope.inserted = {
      name: '',
      email: ''
    };

    return $http.post('/people', $scope.inserted).success(function(response) {
      console.log("success (POST http://localhost:3000/people)");
      $scope.inserted.id = response.id;
      $scope.users.push($scope.inserted);
    }).error(function() {
      console.log("error (POST http://localhost:3000/people)");
    });
  };
}]);