(function() {
  'use strict';

  angular
    .module('artoo')
    .constant('appConst', {
      roles: {
        1: 'Admin',
        2: 'Product Engineer',
        3: 'Support engineer'
      },
      priorities: {
        1: 'High',
        2: 'Medium',
        3: 'Low'
      },
      statuses: {
        1: 'Pending',
        2: 'Completed'
      }
    });

})();
