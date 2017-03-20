(function () {

	angular
    .module('wifidotApp')
    .controller('aboutCtrl', aboutCtrl);

  function aboutCtrl() {
    var vm = this;

    vm.pageHeader = {
      title: 'About WiFiDot'
    };
    vm.main = {
      content: 'WiFiDot was created to help people find places to sit down and get a bit of work done.\n\nWiFiDot 是一个帮助人们找到一个有wifi的地方，在这个地方人们可以完成一些紧急的工作。'
    };
  }

})();