app.controller('UserController', ['$scope', '$filter', '$timeout', 'User', 'Project', 'Membership', 
function($scope, $filter, $timeout, User, Project, Membership) {

  var memberships = [];

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

  loadUsers = function() {
    var user = [];
    $scope.users = [];

    User.query(function(response) {
      for (var i = 0; i < response.length; i++) {
        user = response[i];

        projects = filterArray(memberships, "user_id", user.id, "project_id");
        angular.extend(user, {projects: projects});

        $scope.users.push(user); 
      }
    });
  };

  $scope.init = function() {
    $scope.projects = Project.query();
    memberships = Membership.query(function() {
      loadUsers();
    });
  };

  $scope.saveUser = function(elementData, elementId) {
    var user = new User();
    var membership = new Membership();

    angular.extend(user, {id: elementId, name: elementData.name, email: elementData.email});
    angular.extend(membership, {user: elementId, userProjects: elementData.userProjects});
    user.$update();
    membership.$update();
  };

  $scope.removeUser = function(user, rowIndex) {
    $scope.users.splice(rowIndex, 1);
    user.$delete();
  };

  $scope.addUser = function() {
    $scope.inserted = new User();

    $scope.inserted.$save(function(response) {
      $scope.inserted.id = response.id;
      $scope.users.push($scope.inserted);
    });
  };
}]);