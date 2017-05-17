(function() {
  'use strict';

  angular
    .module('artoo')
    .factory('RootService', RootService);

  /** @ngInject */
  function RootService($localForage) {
    var allUsers = [];
    var presentUser = {};

    //Load available users on to service on intiation
    $localForage.getItem('users').then(function(users) {
      allUsers = users;
    });

    this.getAllUsers = function () {
      return allUsers;
    };

    this.getPresentUser = function () {
      return presentUser;
    };

    this.setPresentUser = function (user) {
      presentUser = user;
    };

    this.setNewUser = function (user) {
      allUsers.push(user);
      $localForage.setItem('users', allUsers);
    };

    this.removeUser = function (index) {
      allUsers.splice(index, 1);
      $localForage.setItem('users', allUsers);
    };

    // for editing user details.
    this.setUser = function (user, index) {
      allUsers[index] = user;
    };

    this.CheckLogin = function() {
      return $localForage.getItem('LoggedUser').then(function(username) {
        if (username) {
          return allUsers.find(function (user) {
            return user.username === username;
          });
        }
        return false;
      });
    };

    this.checkUserName = function(username) {
      return allUsers.findIndex(function (user) {
        return user.username === username;
      });
    };

    return this;
  }
})();
