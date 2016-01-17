app.controller('ProjectsController', ['$scope', '$filter', 'Project', 'User', 'Membership', 'Session', 
function($scope, $filter, Project, User, Membership, Session) {

  var memberships = [];
  var selectedProjects = [1,2,23];

  //$scope.filterProjects = function() {
  //  return function(project) {
  //    return selectedProjects.indexOf(project.id) >= 0;
  //  };
  //}

//  $scope.updateSelectedProjects = function(userIdInput) {
//    var projectId;
//    var userId;
//    var projectExists = false;
//
//    selectedProjects = [];
////    $scope.selectedUser = ($filter('filter')($scope.users, {id: userIdInput}))[0];
//    //var selectedUser = Session.getUser() (function to be implemented)
//
//    for (var i = 0; i < memberships.length; i++) {
//      projectId = memberships[i].project_id;
//      userId = memberships[i].user_id;
//      projectExists = (selectedProjects.indexOf(projectId) >= 0);
//      if (!projectExists && userId == $scope.selectedUser) {
//        selectedProjects.push(projectId);
//      }
//    }
//  };

  $scope.init = function() {
      $scope.projects = Project.query({ user: window.localStorage.user_name.slice(1, -1), token: window.localStorage.access_token.slice(1, -1)});
      $scope.users = User.query();
      memberships = Membership.query();
      $scope.userName = window.localStorage.user_name.slice(1, -1)
  };

  $scope.saveProject = function(elementData, elementId) {
    project = new Project();
    angular.extend(project, {id: elementId, user: window.localStorage.user_name.slice(1, -1), token: window.localStorage.access_token.slice(1, -1)}, elementData);
    project.$update();
  };

  $scope.removeProject = function(project, rowIndex) {
      $scope.projects.splice(rowIndex, 1);
      selectedProjects.splice(selectedProjects.indexOf(project.id), 1);
    project.$delete();
  };

  $scope.addProject = function() {
    $scope.inserted = new Project();
    //var newMembership = new Membership();
      $scope.inserted.user = window.localStorage.user_name.slice(1, -1);
      $scope.inserted.token = window.localStorage.access_token.slice(1, -1)

      $scope.inserted.$save(function(response) {
          $scope.inserted.id = response.id;
          selectedProjects.push(response.id);
          $scope.projects.push($scope.inserted);
          //angular.extend(newMembership, {userId: $scope.selectedUser.id, projectId: response.id});
          //newMembership.$save();
    });
  };
}]);