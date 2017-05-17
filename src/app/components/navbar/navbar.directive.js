(function() {
  'use strict';

  angular
    .module('artoo')
    .directive('navBar', navBar);

  /** @ngInject */
  function navBar($localForage, $window) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
        adminRole: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController() {
      var vm = this;

      vm.logout = function () {
        $localForage.removeItem('LoggedUser');
        $window.location.reload();
      }
      // "vm.creationDate" is available by directive option "bindToController: true"
      // vm.relativeDate = moment(vm.creationDate).fromNow();
    }
  }

})();
