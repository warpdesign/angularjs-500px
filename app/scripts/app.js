(function() {
    'use strict';

    angular.module('angularjs500pxAutomateApp', [
      'ngResource','LocalStorageModule', 'jmdobry.angular-cache'
    ]).config(['localStorageServiceProvider', '$locationProvider', function(localStorageServiceProvider, $locationProvider) {
        localStorageServiceProvider.setPrefix('500photos');
        $locationProvider.html5Mode(true);
    }]);
})();