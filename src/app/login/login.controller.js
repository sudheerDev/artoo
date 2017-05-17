(function() {
  'use strict';

  angular
    .module('artoo')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController(LoginService, $localForage, RootService, $state) {
    var vm = this;

    vm.submitLoginForm = function (username, password) {
      vm.passwordError = false;
      vm.usernameError = false;

      var userMatch = RootService.getAllUsers().find(function (user) {
        return user.username === username;
      });
      if (userMatch) {
        if (userMatch.password === password) {
          RootService.setPresentUser(userMatch);
          $localForage.setItem('LoggedUser', userMatch.username).then(function() {
            $state.go('root.home');
          });
        } else {
          vm.passwordError = true;
        }
      } else {
        vm.usernameError = true;
      }
      return userMatch;
    }

  }
})();
