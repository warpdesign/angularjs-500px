(function() {
'use strict';

angular.module('angularjs500pxAutomateApp')
  .controller('ViewerCtrl', [
        '$scope',
        'event',
        'loader',
        'settings',
        'viewer',
        function($scope, event, loader, settings, viewer) {
            var currentImg = 0;

            $scope.isLoading = loader.isLoading;

            $scope.isFullScreen = function() {
                return settings.getValue('fullscreen') === true ? 'fullscreen' : '';
            };

            $scope.swipeLeft = function() {
                console.log('swipedLeft!');
                viewer.gotoSlide(1, 0);
            };
            
            $scope.swipeRight = function() {
                console.log('swipedRight!');
                viewer.gotoSlide(-1, 0);
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