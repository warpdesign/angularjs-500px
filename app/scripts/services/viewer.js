(function() {
'use strict';

angular.module('angularjs500pxAutomateApp')
  .factory('viewer', [
        '$timeout',
        '$q',
        'loader',
        'photosProvider',
        'settings',
        'event',
        function($timeout, $q, loader, photosProvider, settings, event) {
            var currentId = 0,
                currentIndex = -1,
                pictures = null,
                timeout = null,
                duration = 5000,
                slideshow = settings.getValue('slideshow');

            function getIndexFromId(id) {
                var foundIdx = -1;

                pictures.forEach(function(pic, i) {
                    if (pic.id === id) {
                        foundIdx = i;
                        return false;
                    }
                });

                return foundIdx;
            }

            var Viewer = {
                getPictureInfo: function(id) {
                    return photosProvider.getPhoto(id);
                },
                setPhotoList: function(picsList) {
                    pictures = picsList;
                    event.emit('viewer.ready');
                },
                getPhotoList: function() {
                    return pictures;
                },
                loadFromIndex: function(index) {
                    var id = pictures[typeof index !== 'undefined' ? index : currentIndex].id;

                    return this.loadFromId(id);
                },
                startSlideShow: function() {
                    if (slideshow === false) {
                        slideshow = true;
                        this.nextSlide();
                    }
                },
                loadFromId: function(id) {
                    var that = this;
                    if (id !== currentId) {
                        var def = $q.defer();
                        currentId = id;
                        currentIndex = getIndexFromId(id);
                        console.log('getting pic info for', id);
                        this.getPictureInfo(id).then(function(data) {
                            console.log('got info', data);
                            console.log('loading photo', data.photo['image_url']);
                            var res = data;
                            loader.loadImage(data.photo['image_url']).then(function() {
                                event.emit('viewer.loaded', res.photo);
								console.log('[Viewer] SENT: loaded');
                                if (slideshow === true) {
                                    that.nextSlide();
                                }
                                console.log('photo loaded');
                                def.resolve(res);
                            }, function() {
                                def.reject(false);
                                console.log('oops, error loading url');
                            });
                        });

                        return def.promise;
                    }
                },
                nextSlide: function() {
                    var that = this;

                    // TODO: handle loading ? (do not advance until loading ?
                    this.timeout = $timeout(function() {
                        currentIndex++;
                        if (currentIndex > (pictures.length - 1)) {
                            currentIndex = 0;
                        }
                        that.loadFromIndex();

                    }, duration);
                },
                toggleSlide: function() {
                    if (settings.getValue('slideshow') === true) {
                        this.stopSlide();
                    } else {
                        this.startSlideShow();
                    }
                },
                stopSlide: function() {
                    if (this.timeout) {
                        $timeout.cancel(this.timeout);
                        slideshow = false;
                        this.timeout = null;
                    }
                }
            };

            event.on('controls.stopSlide', function() {
                Viewer.stopSlide();
                settings.setValue('slideshow', false);
            });        

            return Viewer;
        }
    ]);
})();