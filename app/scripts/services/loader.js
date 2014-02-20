(function() {
'use strict';

angular.module('angularjs500pxAutomateApp')
  .factory('loader', [
        '$document',
        '$q',
        '$http',
        '$rootScope',
        '$angularCacheFactory',
        function($document, $q, $http, $rootScope, $angularCacheFactory) {
            var loadCount = 0,
                loading = false,
                myCacheFactory = $angularCacheFactory('500PhotosCache', {
                    maxAge: 3600000,
                    storageMode: 'localStorage'
                });

            function updateCount(inc) {
                loadCount += inc;
                if (loading && loadCount === 0) {
                    loading = false;
                    // remove loader
                } else if (!loading && loadCount > 0) {
                    // show loader
                    loading = true;
                } else {
                    console.log('oops, unknown state', loading, loadCount);
                }
            }

            return {
                clearCache: function() {
                    console.log('clearing cache...');
                    myCacheFactory.removeAll();
                    
                },
                loadImage: function(url) {
                    updateCount(1);
                    var deferred = $q.defer(),
                        img = $document[0].createElement('img');

                    img.src = url;
                    img.onload = function() {
                        $rootScope.$apply(function() {
                            deferred.resolve(img);
                            updateCount(-1);
                        });
                    };

                    img.onerror = function() {
                        $rootScope.$apply(function() {
                            updateCount(-1);
                            deferred.reject(false);
                        });
                    };

                    return deferred.promise;
                },
                getJSON: function(endpoint) {
                    updateCount(1);
                    return $http({
                        cache: myCacheFactory,
                        method: 'GET',
                        url: endpoint
                    }).then(function() {
                        // TODO: error
                        updateCount(-1);
                        return arguments[0].data;
                    }, function() {
                        // TODO: error
                        updateCount(-1);
                        return arguments[0].data;
                    });
                },
                isLoading: function() {
                    return loading;
                }
            };
        }
    ]);
})();