/**
 * Created by teddy on 06/10/15.
 */

angular.module('TimeReportApp')

    .factory('Session', ['$window', function SessionFactory($window) {
        //var CLIENT_ID = '711755136597-5k4ijen3f7j0003088jjimt8knlre2cm.apps.googleusercontent.com';
        var CLIENT_ID = '462878784674-q643pcp1acsrh17m9ms2s84tkpupgbnn.apps.googleusercontent.com';
        var user = null;

        return {

            HandleAuthResult : function(authResult){
                //Hides the authentication button if successful, trigger login process otherwise
                console.log('Enter handleAuthResult' + authResult);
                if (authResult && !authResult.error) {
                    makeApiCall();
                } else {
                    console.log('Error occured');
                };
            },

            Authorize : function (immediateVal, SCOPES) {
                //Initiates the OAuth 2.0 authorization process
                gapi.auth.authorize({
                    'client_id': CLIENT_ID,
                    'immediate': immediateVal,
                    'response_type': "token",
                    'scope': SCOPES
                    }, SessionFactory.HandleAuthResult
                );
            },

            isLoggedIn : function(){
                return(user)? user : false;
            },

            setUser : function(userName, accessToken, expiresAt){
                user = userName;
                //window.localStorage.setItem('userCredentials', JSON.stringify({user_name: userName, access_token: accessToken}));
                $window.localStorage.setItem('access_token', JSON.stringify(accessToken));
                $window.localStorage.setItem('user_name', JSON.stringify(userName));
                //$window.localStorage.setItem('issued_at', JSON.stringify(issuedAt));
                $window.localStorage.setItem('expires_at', JSON.stringify(expiresAt));

            },

            logOutUser : function(){
                user = null;
                console.log("You are now logged out!")
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
