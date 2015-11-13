/**
 * Created by teddy on 06/10/15.
 */

angular.module('TimeReportApp')

    .factory('Session', function SessionFactory(){
        var CLIENT_ID = '462878784674-q643pcp1acsrh17m9ms2s84tkpupgbnn.apps.googleusercontent.com';

        return {
            ListCalendars : function(calendars, calendarsFetched){
                    var request = gapi.client.calendar.calendarList.list({});
                    var singleCalendar = [];

                    calendars = [];

                    return request.execute(function(response) {

                        for (var i = 0; i < response.items.length; i++) {
                            calendars.push({
                                title : response.items[i].summary,
                                id : response.items[i].id
                            });
                        }
                        calendarsFetched = true;
                    });
                }
            };

    });