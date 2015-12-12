app.controller('UserController', [
  '$scope', 
  '$filter', 
  'User', 
  'Project',
  'Membership', function(
    $scope,  
    $filter, 
    User, 
    Project,
    Membership){

  //var rootUrl = "http://127.0.0.1:3000/"
  var rootUrl = "http://localhost:3000/"

  $scope.users = [];
  loadUsers = function() {
    $scope.users = User.query(function() {
      console.log("success (GET " + rootUrl + "api/users)");
    }, function(error) {
      console.log("error (GET " + rootUrl + "api/users)");
    });
  };

  $scope.projects = [];
  loadProjects = function() {
    $scope.projects = Project.query(function() {
      console.log("success (GET " + rootUrl + "api/projects)");
    }, function(error) {
      console.log("error (GET " + rootUrl + "api/projects)");
    });
  };

  $scope.memberships = [];
  loadMemberships = function() {
    $scope.memberships = Membership.query(function() {
      console.log("success (GET " + rootUrl + "api/memberships)");
    }, function(error) {
      console.log("error (GET " + rootUrl + "api/memberships)");
    });
  };

  $scope.init = function() {
    loadUsers();
    loadProjects();
    loadMemberships();
  };

  $scope.showProject = function(user) {
    if(user.project && $scope.projects.length) {
      var selected = $filter('filter')($scope.projects, {id: user.project});
      return selected.length ? selected[0].name : 'Not set';
    } else {
      return 'Not set';
    }
  };

  $scope.saveUser = function(elementData, elementId) {
    var user = new User();

    angular.extend(user, {id: elementId}, elementData);

    user.$update(function() {  
      console.log("success (PUT " + rootUrl + "api/users/" + elementId + ")");
    }, function(error) {
      console.log("error (PUT " + rootUrl + "api/users/" + elementId + ")");
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