(function () {

	angular
    .module('wifidotApp')
    .service('authentication', authentication);

  authentication.$inject = ['$http', '$window'];
  function authentication ($http, $window) {
    
    var saveToken = function (token) {
      $window.localStorage['wifidot-token'] = token;
    };

    var getToken = function () {
      return $window.localStorage['wifidot-token'];
    };

    var isLoggedIn = function() {
      var token = getToken();

      if(token){
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    var currentUser = function() {
      if(isLoggedIn()) {
        var token = getToken();
        //修复中文乱码bug
        var payload = JSON.parse(decodeURIComponent(escape($window.atob(token.split('.')[1]))));
        // var payload = JSON.parse($window.atob(token.split('.')[1]));
        return {
          email: payload.email,
          name: payload.name
        };
      }
    };

    register = function(user) {
      return $http.post('/api/register', user).success(function(data) {
        saveToken(data.token);
      });
    };


    login = function(user) {
      return $http.post('/api/login', user)
          .success(function(data) {
        saveToken(data.token);
      });
    };

    logout = function() {
      $window.localStorage.removeItem('wifidot-token');
    };

    return {
      currentUser : currentUser,
      saveToken : saveToken,
      getToken : getToken,
      isLoggedIn : isLoggedIn,
      register : register,
      login : login,
      logout : logout
      
    };
  }
})();