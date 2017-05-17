(function() {
  'use strict';

  angular
    .module('artoo')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(RootService, $uibModal, BugListService, appConst, $timeout) {
    var vm = this;
    vm.currentUser = RootService.getPresentUser();
    vm.animationsEnabled = true;
    vm.adminId = appConst.roles[1]; // better get key by value with admin
    vm.priorities = appConst.priorities;
    vm.statuses = appConst.statuses;

    if (vm.currentUser.role === 2) {
      $timeout(function () {
        vm.bugList = BugListService.getProductEngBugs(vm.currentUser.username);
      }, 100); // localForage async call back is after this function call. just waiting for stack to be cleared.
    } else {
      vm.bugList = BugListService.getBugList();
    }

    vm.bugModalOpen = function (bugObj, bugIndex) {
      $uibModal.open({
        animation: vm.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'addNewBugModal.html',
        controller: 'AddBugModalController',
        controllerAs: 'vm',
        resolve: {
          bug: bugObj,
          bugIndex: bugIndex
        }
      });
    }

    // class for showing priority label
    vm.priorityClass = function (priority) {
      if (priority === 1) {
        return 'label label-danger';
      } else if (priority === 2) {
        return 'label label-warning';
      } else {
        return 'label label-info';
      }
    };

    // class for showing status label
    vm.statusClass = function (status) {
      if (status === 1) {
        return 'label label-danger';
      } else {
        return 'label label-success';
      }
    };

    // function for onclick of sort - just reverse if its of same sortType or sort
    vm.sortBy = function(type) {
      vm.reverse = vm.filter === type ? !vm.reverse : vm.reverse;
      vm.filter = type;
    }
  }
})();
