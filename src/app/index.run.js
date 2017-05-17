(function() {
  'use strict';

  angular
    .module('artoo')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $localForage, $rootScope, $state) {

    $localForage.getItem('users').then(function(data) {
      var mockData = [{
           "username":"admin",
           "password":"admin",
           "id":1,
           "role":1
        }
      ];

      if(!data) {
        $localForage.setItem('users', mockData);
      }

    });

    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
      if (error === 'routeError') {
        $state.go('root.home');
      } else if (error === 'loginError') {
        $state.go('login')
      }
    });

  }

})();
