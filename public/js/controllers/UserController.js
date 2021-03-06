
angular.module('TimeReportApp')

    .controller('UserController', ['$scope', '$filter', 'User', 'Project', 'Membership', 'Session', 
        function($scope, $filter, User, Project, Membership, Session) {

            var memberships = [];

            findById = function(array, id, attr) {
              for(var i = 0; i < array.length; i += 1) {
                if(array[i].id == id) {
                  return (array[i])[attr];
                }
              }
            }

            filterArray = function(array, keyAttr, key, valueAttr) {
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

              User.query({user: 'admin', token: null}, function(response) {
                for (var i = 0; i < response.length; i++) {
                  user = response[i];

                  projects = filterArray(memberships, "user_id", user.id, "project_id");
                  angular.extend(user, {projects: projects});

                  $scope.users.push(user); 
                }
              });
            };

            $scope.init = function() {
              $scope.projects = Project.query({user: 'admin', token: null});
              memberships = Membership.query(function() {
                loadUsers();
              });
            };

            $scope.saveUser = function(elementData, userData) {
              var user = new User();
              var membership = new Membership();

              angular.extend(user, {id: userData.id, name: userData.name, email: userData.email});
              angular.extend(membership, {user: userData.id, userProjects: elementData.userProjects});
              user.$update();
              membership.$update();
            };

            $scope.removeUser = function(user, rowIndex) {
                $scope.users.splice(rowIndex, 1);
                var currentUser = window.localStorage.user_name.slice(1, -1);
                user.$delete(function() {
                    if (currentUser == user.name) {
                        Session.logOutUser();
                    }
                });
            };

            $scope.addUser = function() {
              $scope.inserted = new User();

              $scope.inserted.$save(function(response) {
                $scope.inserted.id = response.id;
                $scope.users.push($scope.inserted);
              });
            };
        }]);