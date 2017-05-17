(function() {
  'use strict';

  angular
    .module('artoo')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, $localForageProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;


    $localForageProvider.config({
      name        : 'artoo', // name of the database and prefix for your data, it is "lf" by default
      description : 'some description'
    });
  }

})();
