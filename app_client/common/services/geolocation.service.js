(function () {

  angular
    .module('wifidotApp')
    .service('geolocation', geolocation);

  /*function geolocation () {
    var getPosition = function (cbSuccess, cbError, cbNoGeo) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
      }
      else {
        cbNoGeo();
      }
    };
    return {
      getPosition : getPosition
    };
  }*/
  function geolocation () {
      var getPosition = function (cbSuccess, cbNoGeo) {
        if (navigator.geolocation) {
          var geolocation = new BMap.Geolocation();
          geolocation.getCurrentPosition(cbSuccess);
        }
        else {
          cbNoGeo();
        }
      };
      return {
        getPosition : getPosition
      };
    }
  
})();
