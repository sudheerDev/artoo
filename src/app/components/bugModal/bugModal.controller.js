
(function() {
  'use strict';

  angular
    .module('artoo')
    .controller('AddBugModalController', AddBugModalController);

  /** @ngInject */
  function AddBugModalController($uibModalInstance, BugListService, bug, bugIndex, RootService) {
    var vm = this;

    // if edit of bug param - bug is sent to modal through resolve so add default values
    if (bug) {
      vm.bugName = bug.name;
      vm.bugDesc = bug.description;
      vm.priority = bug.priority;
      vm.status = bug.status;
      vm.assignedTo = bug.assignedTo;
    } else {
      vm.priority = 2;
      vm.status = 1;
    }

    vm.priorities = [
      {'lookupCode': 1, 'description': 'High'},
      {'lookupCode': 2, 'description': 'Medium'},
      {'lookupCode': 3, 'description': 'Low'}
    ];

    vm.statuses = [
      {'lookupCode': 1, 'description': 'Pending'},
      {'lookupCode': 2, 'description': 'Completed'}
    ];

    vm.allUsers = RootService.getAllUsers();

    // for assigning users - filter for only product engineers
    vm.allProductEngineers = vm.allUsers.filter(function (user) {
      return user.role === 2;
    });

    vm.addNewBug = function () {
      var bugDetails = {
        name: vm.bugName,
        description: vm.bugDesc,
        priority: vm.priority,
        status: vm.status,
        assignedTo: vm.assignedTo
      };

      // if bug exists its edit so, override with index.
      if (bug) {
        BugListService.saveBug(bugDetails, bugIndex);
      } else {
        BugListService.addNewBug(bugDetails);
      }

      $uibModalInstance.close();
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

  }
})();
