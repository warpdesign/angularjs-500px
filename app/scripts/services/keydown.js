(function() {
'use strict';

angular.module('angularjs500pxAutomateApp')
  .factory('keydown', ['$document', function($document) {
        var callbacks = {};

        $document[0].addEventListener('keydown', function(event) {
            if (callbacks[event.keyCode]) {
                callbacks[event.keyCode].forEach(function(callback) {
                    if (callback()) {
                        return false;
                    }
                });
            }
        });

        return {
            on: function(keyCode, callback) {
                var array = callbacks[keyCode] || [];

                array.push(callback);

                callbacks[keyCode] = array;
            },
            keys:{
                'i': 73,
                'f': 70,
                's': 83,
                'space': 32
            }
        };
    }]);
})();