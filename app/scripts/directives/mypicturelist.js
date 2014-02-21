(function() {
'use strict';

angular.module('angularjs500pxAutomateApp')
  .directive('myPictureList', ['event', function(event) {
        return {
            restrict: 'E',
            scope: {
                pics: '=pics',
            },
            templateUrl: 'views/picture-list.html',
            controller: ['$scope', 'viewer', function($scope, viewer) {
                $scope.loadPicture = function(id) {
                    viewer.loadFromId(id);
                }
            }],
            link: function(scope, element, attrs, ctrl) {
                var active = null;
                element.bind('click', function(e) {
                    if (e.toElement.tagName !== 'IMG') {
                        return;
                    } else {
                        event.emit('controls.stopSlide');
                    }
                });

                event.on('viewer.loaded', function(event, data) {
                    var domElement = element[0],
                        currentActive = domElement.querySelector('.active'),
                        newElement = domElement.querySelector('#photo_' + data.id);

                    if (currentActive) {
                        currentActive.classList.remove('active');
                    }

                    if (newElement) {
                        newElement.classList.add('active');
                    } else {
                        console.log('oops, could not find new selected element');
                    }
                });
            }
        };
    }]);
})();