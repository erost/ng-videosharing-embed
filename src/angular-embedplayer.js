angular.module('videosharing-embed', []);

angular.module('videosharing-embed').service('PlayerConfig', function () {
	'use strict';
    this.createInstance = function (init) {
        var PlayerConfig = function (init) {
            this.playerRegExp = init.playerRegExp;
            this.whitelist = init.whitelist;
            this.config = {
                playerID: init.playerID,
                options: init.options
            };
            this.isPlayerFromURL = function (url) {
                return (url.match(this.playerRegExp) != null);
            }
        };
        return new PlayerConfig(init);
    }
});

angular.module('videosharing-embed').factory('RegisteredPlayers', [ 'PlayerConfig', function (PlayerConfig) {
	'use strict';
    var configurations = {
        youtube: {
            options: {
                autoplay: 0,
                controls: 1,
                loop: 0,
            },
            whitelist: ['autoplay', 'controls', 'loop', 'playlist', 'rel', 'wmode'],
            playerID: 'www.youtube.com/embed/',
            protocol: 'http://',
            playerRegExp: /(http:|https:)?\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\-\w]*)(&(amp;)?[\w\?=]*)?/
        },
        youtubeNoCookie: {
            options: {
                autoplay: 0,
                controls: 1,
                loop: 0,
            },
            whitelist: ['autoplay', 'controls', 'loop', 'playlist', 'rel', 'wmode'],
            playerID: 'www.youtube-nocookie.com/embed/',
            protocol: 'http://',
            playerRegExp: /(http:|https:)?\/\/(www\.youtube\-nocookie\.com)\/watch\?v=([A-Za-z0-9\-\_]+)/
        },
        vimeo: {
            options: {
                autoplay: 0,
                loop: 0,
            },
            whitelist: ['autoplay', 'color', 'loop'],
            playerID: 'player.vimeo.com/video/',
            protocol: 'http://',
            playerRegExp: /(http:|https:)?\/\/vimeo\.com\/([A-Za-z0-9]+)/
        },
        dailymotion: {
            options: {
                autoPlay: 0,
                logo: 0,
            },
            whitelist: ['autoPlay', 'logo', 'forceQuality'],
            playerID: 'www.dailymotion.com/embed/video/',
            protocol: 'http://',
            playerRegExp: /(http:|https:)?\/\/www\.dailymotion\.com\/video\/([A-Za-z0-9]+)/
        }
    };
    var players = [];
    angular.forEach(configurations, function (value) {
        players.push(PlayerConfig.createInstance(value));
    });
    return players;
}]);
