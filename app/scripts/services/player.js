(function() {
'use strict';

angular.module('angularjs500pxAutomateApp')
  .factory('player', ['audio', 'settings', function(audio, settings) {
        // hardcoded for now
        var url = 'http://ia600500.us.archive.org/10/items/mia049/mia49a_aphilas_-_lifelong_fiction.mp3';

        var player = {
            playing: false,
            ready: false,
            setUrl: function() {
                audio.src = url;            
            },

            play: function(mp3_url) {
                audio.play();
                this.playing = true;
            },

            togglePlay: function() {
                if (this.playing === true) {
                    this.stop();
                } else {
                    this.play();
                }
            },

            stop: function() {
                audio.pause();
                this.playing = false;
            }
        };

        player.setUrl(url);

        return player;
    }]);
})();