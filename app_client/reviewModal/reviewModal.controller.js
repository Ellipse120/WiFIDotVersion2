(function () {

	angular
    .module('wifidotApp')
    .controller('reviewModalCtrl', reviewModalCtrl);

  reviewModalCtrl.$inject = ['$modalInstance', 'wifidotData', 'locationData'];
  function reviewModalCtrl ($modalInstance, wifidotData, locationData) {
    var vm = this;
    vm.locationData = locationData;

    vm.onSubmit = function() {
      vm.formError = "";
      if (!vm.formData.rating || !vm.formData.reviewText) {
        vm.formError = "All fields required, please try again";
        return false;
      } else {
        vm.doAddReview(vm.locationData.locationid, vm.formData);
      } 
    };

    vm.doAddReview = function(locationid, formData) {
          wifidotData.addReviewById(locationid, {
            rating : formData.rating,
            reviewText : formData.reviewText
          })
            .success(function (data) {
              vm.modal.close(data);
            })
            .error(function (data) {
              vm.formError = "Your review has not been saved, try again";
            });
          return false;
        };

    vm.modal = {
      close : function (result) {
        $modalInstance.close(result);
      },
      cancel : function () {
        $modalInstance.dismiss('cancel');
      }
    };
  }
})();