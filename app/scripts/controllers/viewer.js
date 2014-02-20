(function() {
'use strict';

angular.module('angularjs500pxAutomateApp')
  .controller('ViewerCtrl', [
        '$scope',
        'event',
        'loader',
        'settings',
        function($scope, event, loader, settings) {
            var currentImg = 0;

            $scope.isLoading = loader.isLoading;

            $scope.isFullScreen = function() {
                return settings.getValue('fullscreen') === true ? 'fullscreen' : '';
            };

            function setImageSrc(odd, url) {
                if (odd) {
                    $scope.photo1 = url;
                    $scope.class1 = 'shown';
                    $scope.class2 = 'hidden';
                } else {
                    $scope.photo2 = url;
                    $scope.class2 = 'shown';
                    $scope.class1 = 'hidden';
                }
            }

            event.on('viewer.loaded', function(event, photo) {
                setImageSrc(currentImg++ % 2, photo.image_url);
            });
        }
    ]);
})();