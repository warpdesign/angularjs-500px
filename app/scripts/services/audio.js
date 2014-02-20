(function() {
'use strict';

angular.module('angularjs500pxAutomateApp')
  .factory('audio', ['$document', function($document) {
        return $document[0].createElement('audio');
    }]);
})();