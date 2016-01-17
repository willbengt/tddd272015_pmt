angular.module('TimeReportApp')

    .factory('Session', ['$window', function SessionFactory($window) {
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

            //--------------------------------------------
            //The $http created a circle dependency error, will probably need to change to $resource instead
            //--------------------------------------------
            //    $http({
            //            url: '/api/session',
            //            method: 'GET',
            //            params: {
            //                user: $window.localStorage.user_name.splice(1,-1),
            //                token: $window.localStorage.access_token.splice(1,-1)
            //            }
            //        }).success(function(response) {
            //            $window.localStorage.setItem('access_token', JSON.stringify(response.accessToken));
            //            //$window.localStorage.setItem('user_name', JSON.stringify(response.userName));
            //            //$window.localStorage.setItem('issued_at', JSON.stringify(response.issued_at));
            //            $window.localStorage.setItem('expires_at', JSON.stringify(response.expires_at));
            //        });
            //    };
            //}
        };

    }]);
