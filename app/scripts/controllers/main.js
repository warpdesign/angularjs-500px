(function() {
'use strict';

angular.module('angularjs500pxAutomateApp')
  .controller('MainCtrl', ['$scope', '$location', 'loader', 'photosProvider', function($scope, $location, loader, photosProvider) {
        var params = $location.search(),
            feed = params.feed || 'popular',
            clearCache = params.clearCache === 'true';
        
        console.log('plop, main!', feed, clearCache);

        if (clearCache === true) {
            loader.clearCache();
        }
        
        photosProvider.getList(feed).then(function(pics) {
            $scope.pics = pics;
        }, function() {
            console.log('could not get photos');
        });
    }]);
})();