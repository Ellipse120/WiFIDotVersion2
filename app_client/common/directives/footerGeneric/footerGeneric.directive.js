(function () {

  angular
    .module('wifidotApp')
    .directive('footerGeneric', footerGeneric);

  function footerGeneric () {
	return {
      restrict: 'EA',
      templateUrl: '/common/directives/footerGeneric/footerGeneric.template.html'
  };
}

})();
