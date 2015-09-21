app.controller("SecureController", function($scope, User){
    $scope.accessToken = JSON.parse(window.localStorage.getItem("google")).oauth.access_token;
    $scope.test_msg = User.query();
});