(function() {
'use strict';

angular.module('angularjs500pxAutomateApp')
  .factory('photosProvider', ['loader', '$q', function(loader, $q) {
      // TODO
        var API_LIST = '/proxy/500photos.php',
            API_PHOTO = '/proxy/500photos.php?id=';

        return {
            getList: function() {
                var def = $q.defer();

                loader.getJSON(API_LIST).then(function(data) {
                    def.resolve(data.photos);
                }, function() {
                    def.reject(false);
                });

                return def.promise;
            },
            getPhoto: function(id) {
                return loader.getJSON(API_PHOTO + id);
            }
        };
    }]);
})();