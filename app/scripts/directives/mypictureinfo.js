(function() {
'use strict';

angular.module('angularjs500pxAutomateApp')
  .directive('myPictureInfo', function() {
        return {
            restrict: 'E',
            templateUrl: 'views/picture-info.html'
        };
    });
})();