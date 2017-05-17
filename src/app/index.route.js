(function() {
  'use strict';

  angular
    .module('artoo')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('root', {
        url: '',
        abstract: true,
        templateUrl: 'app/root/root.html',
        resolve: {
            loginCheck: function(RootService, $q) {
              var deferred = $q.defer();
              RootService.CheckLogin().then(function (result) {
                if (result) {
                  RootService.setPresentUser(result);
                  deferred.resolve();
                }
                deferred.reject('loginError');
              });
              return deferred.promise;
            }
          }
      })
      .state('root.home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'vm'
      })
      .state('root.manageUsers', {
        url: '/users',
        templateUrl: 'app/users/manageUsers.html',
        controller: 'ManageUsersController',
        controllerAs: 'vm',
        resolve: {
          adminCheck: function(RootService, $q) {
            var deferred = $q.defer();
            var user = RootService.getPresentUser();
              if (user.role !== 1) {
                deferred.reject('routeError');
              }
              deferred.resolve();
            return deferred.promise;
          }
        }
      })
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm',
        resolve: {
            loginCheck: function(RootService, $q) {
              var deferred = $q.defer();
              RootService.CheckLogin().then(function (result) {
                if (result) {
                  deferred.reject('routeError');
                }
                deferred.resolve();
              });
              return deferred.promise;
            }
          }
      });

    $urlRouterProvider.otherwise('/');
  }

})();
