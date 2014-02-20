(function() {
'use strict';

angular.module('angularjs500pxAutomateApp')
  .factory('event', ['$rootScope', function($rootScope) {
        return {
            on: function(name, callback) {
                $rootScope.$on('event' + name, callback);
            },
            emit: function(name, data) {
                $rootScope.$emit('event' + name, data);
            }
        };
    }]);
})();