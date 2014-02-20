(function() {
'use strict';

angular.module('angularjs500pxAutomateApp')
  .factory('settings', ['localStorageService', function(localStorageService) {
        var settings = localStorageService.get('settings') || {
            sound: true,
            fullscreen: true,
            slideshow: true
        };

        localStorageService.set('settings', settings);

        return {
            getValue: function(set) {
                return settings[set];
            },
            setValue: function(set, val) {
                settings[set] = val;

                // save settings
                localStorageService.set('settings', settings);
            },
            toggleValue: function(set) {
                this.setValue(set, !settings[set]);
            },
            getAllValues: function() {
                return settings;
            }
        };
    }]);
})();