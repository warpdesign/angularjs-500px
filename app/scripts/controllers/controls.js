(function() {
'use strict';

angular.module('angularjs500pxAutomateApp')
  .controller('ControlsCtrl', [
        '$scope',
        'event',
        'viewer',
        'player',
        'keydown',
        'settings',
        function($scope, event, viewer, player, keydown, settings) {
            if (settings.getValue('sound') === true) {
                player.play();
            }

            $scope.isActive = function(setting) {
                return settings.getValue(setting) === true ? 'active' : '';
            };

            $scope.toggleFS = function() {
                settings.toggleValue('fullscreen');
            };

            $scope.toggleSlide = function() {
                viewer.toggleSlide();
                settings.toggleValue('slideshow');
            };

            $scope.toggleSound = function() {
                settings.toggleValue('sound');
                player.togglePlay();
            };

            $scope.$watch('pics', function() {
                // pics has changed: what should we do ?
                if (typeof $scope.pics !== 'undefined') {
                    // load First picture automatically
                    viewer.setPhotoList($scope.pics);
                }
            });

            keydown.on(keydown.keys['f'], function() {
                $scope.$apply(function() {
                    settings.toggleValue('fullscreen');
                });
            });

            keydown.on(keydown.keys['space'], function() {
                $scope.$apply(function() {
                    $scope.toggleSlide();
                });
            });

            keydown.on(keydown.keys['s'], function() {
                $scope.$apply(function() {
                    $scope.toggleSound();
                });
            });        

            event.on('viewer.loaded', function(event, photo) {
                $scope.photo = photo;
                $scope.visible = true;
            });

            event.on('viewer.ready', function() {
                viewer.loadFromIndex(0);
            });
        }
    ]);
})();