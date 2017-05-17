(function() {
  'use strict';

  angular
    .module('artoo')
    .factory('BugListService', BugListService);

  /** @ngInject */
  function BugListService($localForage) {
    var bugsList = [];

    $localForage.getItem('bugs').then(function(bugs) {
      if (bugs) {
        Array.prototype.push.apply(bugsList, bugs);
      }
    });

    this.getBugList = function () {
      return bugsList;
    };

    this.getProductEngBugs = function (username) {
      return bugsList.filter(function(bug) {
        return bug.assignedTo == username;
      });
    };

    this.saveBug = function (bug, bugIndex) {
      bugsList[bugIndex] = bug;
      $localForage.setItem('bugs', bugsList);
    };

    this.addNewBug = function(bug) {
      bugsList.unshift(bug);
      $localForage.setItem('bugs', bugsList);
    };

    return this;
  }
})();
