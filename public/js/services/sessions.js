angular.module('TimeReportApp')

    .factory('Session', function($window) {
        var user = null;

        return {

            isLoggedIn : function(){
                return(user)? user : false;
            },

            setUser : function(userName, accessToken, expiresAt){
                user = userName;
                $window.localStorage.setItem('access_token', JSON.stringify(accessToken));
                $window.localStorage.setItem('user_name', JSON.stringify(userName));
                $window.localStorage.setItem('expires_at', JSON.stringify(expiresAt));
            },

            logOutUser : function(){
                user = null;
            }
        };
    });