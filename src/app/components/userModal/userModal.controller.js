
(function() {
  'use strict';

  angular
    .module('artoo')
    .controller('AddUserModalController', AddUserModalController);

  /** @ngInject */
  function AddUserModalController($uibModalInstance, BugListService, RootService, user, userIndex) {
    var vm = this;

    vm.usernameError = false;
    if (user) {
      vm.username = user.username;
      vm.password = user.password;
      vm.role = user.role;
    }

    vm.roles = [
      {'lookupCode': 1, 'description': 'Admin'},
      {'lookupCode': 2, 'description': 'Prduct engineer'},
      {'lookupCode': 3, 'description': 'Support engineer'}
    ];

    vm.addNewUser = function () {
      var userDetails = {
        username: vm.username,
        password: vm.password,
        role: vm.role
      };

      if (user) {
        RootService.setUser(userDetails, userIndex);
      } else {
        RootService.setNewUser(userDetails);
      }

      $uibModalInstance.close();
    };

    vm.checkUserName = function(name) {
      var index = RootService.checkUserName(name);
      if (index > 0 && index != userIndex) {
        vm.usernameError = true;
      } else {
        vm.usernameError = false;
      }
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

  }
})();
