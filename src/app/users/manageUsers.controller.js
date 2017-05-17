(function() {
  'use strict';

  angular
    .module('artoo')
    .controller('ManageUsersController', ManageUsersController);

  /** @ngInject */
  function ManageUsersController($uibModal, appConst, RootService) {
    var vm = this;

    vm.userList = RootService.getAllUsers();
    vm.roles = appConst.roles;

    vm.userModalOpen = function (user, userIndex) {
      $uibModal.open({
        animation: vm.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'addNewUserModal.html',
        controller: 'AddUserModalController',
        controllerAs: 'vm',
        resolve: {
          user: user,
          userIndex: userIndex
        }
      });
    };

    vm.removeUser = function(index) {
      RootService.removeUser(index);
    };

  }
})();
