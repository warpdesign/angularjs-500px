(function() {
'use strict';
angular.module('angularjs500pxAutomateApp')
  .directive('myPictureList', ['event', '$timeout', function(event, $timeout) {
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
				function setActiveThumb(id) {
                    var domElement = element[0],
                        currentActive = domElement.querySelector('.active'),
                        newElement = domElement.querySelector('#photo_' + id);

                    if (currentActive) {
                        currentActive.classList.remove('active');
                    }

                    if (newElement) {
                        newElement.classList.add('active');
                    } else {
                        console.log('oops, could not find new selected element');
                    }
				}

                element.bind('click', function(e) {
                    if (e.toElement.tagName !== 'IMG') {
                        return;
                    } else {
                        event.emit('controls.stopSlide');
                    }
                });

				scope.$watch('pics', function() {
					// use $timeout to be sure template has been rendered by Angular
					$timeout(function() {
						setActiveThumb(scope.pics[0].id);
					});
				});

                event.on('viewer.loaded', function(event, data) {
					setActiveThumb(data.id);
                });
            }
        };
    }]);
})();