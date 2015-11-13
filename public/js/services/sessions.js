/**
 * Created by teddy on 06/10/15.
 */

angular.module('TimeReportApp')

    .factory('Session', function SessionFactory() {
        //var CLIENT_ID = '711755136597-5k4ijen3f7j0003088jjimt8knlre2cm.apps.googleusercontent.com';
        var CLIENT_ID = '462878784674-q643pcp1acsrh17m9ms2s84tkpupgbnn.apps.googleusercontent.com';
        var user;

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
                    'scope': SCOPES,
                    }, SessionFactory.HandleAuthResult
                );
            },

            isLoggedIn : function(){
                return(user)? user : false;
            },

            setUser : function(aUser){
                user = aUser;
            }
        };

    });