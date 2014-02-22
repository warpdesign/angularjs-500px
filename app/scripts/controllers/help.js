(function() {
'use strict';

angular.module('angularjs500pxAutomateApp')
  .controller('HelpCtrl', [
        '$scope',
        '$timeout',
        'keydown',
        function($scope, $timeout, keydown) {
            var visible = true;

            $scope.visible = 'visible';

            $scope.toggleVisibility = function() {
                visible = !visible;
                $scope.visible = visible ? 'visible' : '';
            };

            keydown.on(keydown.keys.i, function() {
                $scope.$apply(function() {
                    $scope.toggleVisibility();
                });
            });

            $scope.hide = function() {
                $timeout($scope.toggleVisibility, 5000);
            };
        }
    ]);
})();