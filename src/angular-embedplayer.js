angular.module('videosharing-embed', []);

angular.module('videosharing-embed').service('PlayerConfig', function () {
	'use strict';
    this.createInstance = function (init) {
        var PlayerConfig = function (init) {
            this.type = init.type;
            this.playerRegExp = init.playerRegExp;
            this.timeRegExp = init.timeRegExp;
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
//
angular.module('videosharing-embed').factory('RegisteredPlayers', [ 'PlayerConfig', function (PlayerConfig) {
	'use strict';
    var configurations = {
        youtube: {
            type: "youtube",
            options: {
                autoplay: 0,
                controls: 1,
                loop: 0
            },
            whitelist: ['autoplay', 'controls', 'loop', 'playlist', 'rel', 'wmode', 'start', 'showinfo'],
            playerID: 'www.youtube.com/embed/',
            protocol: 'http://',
            playerRegExp: /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
            timeRegExp: /t=(([0-9]+)h)?(([0-9]{1,2})m)?(([0-9]+)s?)?/
        },
        vimeo: {
            type: "vimeo",
            options: {
                autoplay: 0,
                loop: 0
            },
            whitelist: ['autoplay', 'color', 'loop'],
            playerID: 'player.vimeo.com/video/',
            protocol: 'http://',
            playerRegExp: /vimeo\.com\/([A-Za-z0-9]+)/,
            timeRegExp: ''
        },
        dailymotion: {
            type: "dailymotion",
            options: {
                autoPlay: 0,
                logo: 0
            },
            whitelist: ['autoPlay', 'logo', 'forceQuality', 'start'],
            playerID: 'www.dailymotion.com/embed/video/',
            protocol: 'http://',
            playerRegExp: /www\.dailymotion\.com\/video\/([A-Za-z0-9]+)/,
            timeRegExp: /start=([0-9]+)/
        },
        youku: {
            type: "youku",
            options: {},
            whitelist: [],
            playerID: 'player.youku.com/embed/',
            protocol: 'http://',
            playerRegExp: /youku\.com\/v_show\/id_([A-Za-z0-9]+).html/,
            timeRegExp: ''
        }
    };
    var players = [];
    angular.forEach(configurations, function (value) {
        players.push(PlayerConfig.createInstance(value));
    });
    return players;
}]);
