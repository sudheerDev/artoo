(function() {
  'use strict';

  angular
    .module('artoo')
    .factory('LoginService', LoginService);

  /** @ngInject */
  function LoginService() {

    var userInfo;

    this.getUserInfo = function() {
      return userInfo;
    };

    this.setUserInfo = function(userInfo) {
      userInfo = userInfo;
    };

    return this;
  }
})();
