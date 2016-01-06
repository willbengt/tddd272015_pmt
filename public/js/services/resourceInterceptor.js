app.factory('ResourceInterceptor', function() {

  var rootUrl = "http://localhost:3000";
  //var rootUrl = "http://127.0.0.1:3000/";
    
  return {
    response: function (data) {
      console.log("success (" + data.config.method + ' ' + rootUrl + data.config.url + ")", data);
      return data;
    },
    responseError: function (data) {
      alert("error (" + data.config.method + ' ' + rootUrl + data.config.url + ")")
      console.log("error (" + data.config.method + ' ' + rootUrl + data.config.url + ")", data);
      return data;
    }
  };
});