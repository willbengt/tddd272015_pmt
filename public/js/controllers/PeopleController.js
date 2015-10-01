app.controller('PeopleController', ['$scope', '$http', '$filter', function($scope, $http, $filter){

  $scope.people = [];
  loadPeople = function() {
    return $http.get('/people').success(function(data) {
      console.log("success (GET http://localhost:3000/people)");
      $scope.people = data;
    }).error(function() {
      console.log("error (GET http://localhost:3000/people)");
    });
  };

  $scope.projects = [];
  loadProjects = function() {
    console.log("loadProjects");
    return $http.get('/project').success(function(data) {
      console.log("success (GET http://localhost:3000/project)");
      $scope.projects = data;
    }).error(function() {
      console.log("error (GET http://localhost:3000/project)");
    });
  };

  $scope.init = function() {
    loadPeople();
    loadProjects();
  };

  $scope.showProject = function(person) {
    if(person.project && $scope.projects.length) {
      var selected = $filter('filter')($scope.projects, {id: person.project});
      return selected.length ? selected[0].name : 'Not set';
    } else {
      return 'Not set';
    }
  };

  $scope.savePerson = function(data, id) {
    return $http.put('/people/' + id, data).success(function(response) {
      console.log("success (PUT http://localhost:3000/people/" + id + ")");
    }).error(function() {
      console.log("error (PUT http://localhost:3000/people/" + id + ")");
    });
  };

  $scope.removePerson = function(id, rowIndex) {
    $scope.people.splice(rowIndex, 1);
    return $http.delete('/people/' + id).success(function(response) {
      console.log("success (DELETE http://localhost:3000/people/" + id + ")");
    }).error(function() {
      console.log("error (DELETE http://localhost:3000/people/" + id + ")");
    });
  };
  
  $scope.addPerson = function() {
    $scope.inserted = {
      name: '',
      email: ''
    };

    return $http.post('/people', $scope.inserted).success(function(response) {
      console.log("success (POST http://localhost:3000/people)");
      $scope.inserted.id = response.id;
      $scope.people.push($scope.inserted);
    }).error(function() {
      console.log("error (POST http://localhost:3000/people)");
    });
  };
}]);