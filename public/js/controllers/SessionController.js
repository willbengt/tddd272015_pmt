/**
 * Created by teddy on 18/08/15.
 */

app.controller('SessionController', ['$scope','$http', '$log', function($scope, $http, $log){

    $scope.login=function() {
        var client_id="462878784674-q643pcp1acsrh17m9ms2s84tkpupgbnn.apps.googleusercontent.com";
        var scope="email%20profile";
        var redirect_uri="http://localhost:3000/oauth_callback";
        var response_type="token";
        var url="https://accounts.google.com/o/oauth2/auth?scope="+scope+"&client_id="+client_id+"&redirect_uri="+redirect_uri+
            "&response_type="+response_type;
        window.location.replace(url);
    };

    /*$scope.login = function() {
        window.location.href = "https://api.imgur.com/oauth2/authorize?client_id=" + "772e4e0d393959b" + "&response_type=token";
    }*/

    $scope.logout = function() {
        window.localStorage.removeItem("imgur");
    }

    $scope.callbackHandler = function() {
        var originSite = 'google';
        var callbackResponse = (document.URL).split("#")[1];
        $scope.callback_msg = callbackResponse;
        var responseParameters = (callbackResponse).split("&");
        var parameterMap = [];
        for (var i = 0; i < responseParameters.length; i++) {
            parameterMap[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
        }
        if (parameterMap.access_token !== undefined && parameterMap.access_token !== null) {
            var google = {
                oauth: {
                    originSite: originSite,
                    access_token: parameterMap.access_token,
                    token_type: parameterMap.token_type,
                    expires_in: parameterMap.expires_in,
                    account_username: parameterMap.account_username
                }
            };
            $scope.test_msg = $scope.userValidation(google.oauth);
            window.localStorage.setItem("google", JSON.stringify(google));

            window.location.href = "/#secure";
        } else {
            $scope.callback_msg = "Problem authenticating";
        }
    };

    $scope.userValidation = function(access_token){
        $http.put('/authenticate', access_token).success(
            function (response) {
                $scope.validationResponse = response;
            })
            .error(
            $scope.validationResponse = "Something wrong with validation"
        );
        return $scope.validationResponse;
    };

}]);
