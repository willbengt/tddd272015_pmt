app.controller('UserController', [
  '$scope', 
  '$filter',
  '$timeout', 
  'User', 
  'Project',
  'Membership', function(
    $scope,  
    $filter,
    $timeout, 
    User, 
    Project,
    Membership){

  //var rootUrl = "http://127.0.0.1:3000/";
  var rootUrl = "http://localhost:3000/";
  var memberships = [];
  $scope.projects = [];

  function findById(array, id, attr) {
    for(var i = 0; i < array.length; i += 1) {
      if(array[i].id == id) {
        return (array[i])[attr];
      }
    }
  }

  function filterArray(array, keyAttr, key, valueAttr) {
    var values = [];
    
    for(var i = 0; i < array.length; i += 1) {
      if((array[i])[keyAttr] == key) {
        values.push((array[i])[valueAttr]);
      }
    }
    return values;
  }

  $scope.showProjects = function(user) {
    var selected = [];
    var project;

    if(user.projects) {
      for (var i = 0; i < user.projects.length; i++) {
        project = findById($scope.projects, user.projects[i], "name"); 
        selected.push(project);
      }
    }

    return selected.length ? $filter('orderBy')(selected).join(', ') : 'Not set';
  }; 

  $scope.users = [];
  loadUsers = function() {
    var user = [];

    User.query(function(response) {
      for (var i = 0; i < response.length; i++) {
        user = response[i];

        projects = filterArray(memberships, "user_id", user.id, "project_id");
        angular.extend(user, {projects: projects});

        $scope.users.push(user); 
      }
      console.log("success (GET " + rootUrl + "api/users)");
    }, function(error) {
      console.log("error (GET " + rootUrl + "api/users)");
    });
  };

  $scope.init = function() {
    memberships = Membership.query(function() {
      $scope.projects = Project.query(function() {
        loadUsers();
      });
    });
  };

  $scope.saveUser = function(elementData, elementId) {
    var user = new User();
    var membership = new Membership();

    angular.extend(user, {id: elementId, name: elementData.name, email: elementData.email});
    angular.extend(membership, {userId: elementId, userProjects: elementData.userProjects});
    user.$update(/*function() {  
      console.log("success (PUT " + rootUrl + "api/users/" + elementId + ")");
    }, function(error) {
      console.log("error (PUT " + rootUrl + "api/users/" + elementId + ")");
    }*/);

    membership.$update(function() {  
      console.log("success (PUT " + rootUrl + "api/memberships/" + elementId + ")");
    }, function(error) {
      console.log("error (PUT " + rootUrl + "api/memberships/" + elementId + ")");
    });
  };

  $scope.removeUser = function(user, rowIndex) {
    $scope.users.splice(rowIndex, 1);
    user.$delete(function() {
      console.log("success (DELETE " + rootUrl + "api/projects/" + user.id + ")");
    }, function(error) {
      console.log("error (DELETE " + rootUrl + "api/projects/" + user.id + ")");
    });
  };

  $scope.addUser = function() {
    $scope.inserted = new User();

    $scope.inserted.name = '';
    $scope.inserted.email = '';
    $scope.inserted.project = '';

    $scope.inserted.$save(function(response) {
      console.log("success (POST " + rootUrl + "api/users)");
      $scope.inserted.id = response.id;
      $scope.users.push($scope.inserted);
    }, function(error) {
      console.log("error (POST " + rootUrl + "api/users)");
    });
  };
}]);