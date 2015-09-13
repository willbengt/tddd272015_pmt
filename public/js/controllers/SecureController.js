app.controller("SecureController", function($scope, Test){
    $scope.accessToken = JSON.parse(window.localStorage.getItem("imgur")).oauth.access_token;
    $scope.test_msg = Test.all();
});