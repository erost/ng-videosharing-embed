/**
 * Embed videos using AngularJS directives
 * @version v0.1.4 - 2013-02-22
 * @link 
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

angular.module('videosharing-embed', []);

angular.module('videosharing-embed').service('PlayerConfig', function () {
	'use strict';
    this.createInstance = function (init) {
        var PlayerConfig = function (init) {
            this.playerRegExp = init.playerRegExp;
            this.whitelist = init.whitelist;
            this.config = {
                width: 560,
                height: 315,
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
            whitelist: ['autoplay', 'controls', 'loop', 'playlist', 'rel'],
            playerID: 'www.youtube.com/embed/',
            protocol: 'http://',
            playerRegExp: /(http:\/\/|https:\/\/)www\.youtube\.com\/watch\?v=([A-Za-z0-9\-\_]+)/
        },
        youtubeNoCookie: {
            options: {
                autoplay: 0,
                controls: 1,
                loop: 0,
            },
            whitelist: ['autoplay', 'controls', 'loop', 'playlist', 'rel'],
            playerID: 'www.youtube-nocookie.com/embed/',
            protocol: 'http://',
            playerRegExp: /(http:\/\/|https:\/\/)www\.youtube\-nocookie\.com\/watch\?v=([A-Za-z0-9\-\_]+)/
        },
        vimeo: {
            options: {
                autoplay: 0,
                loop: 0,
            },
            whitelist: ['autoplay', 'color', 'loop'],
            playerID: 'player.vimeo.com/video/',
            protocol: 'http://',
            playerRegExp: /(http:\/\/)vimeo\.com\/([A-Za-z0-9]+)/
        },
        dailymotion: {
            options: {
                autoPlay: 0,
                logo: 0,
            },
            whitelist: ['autoPlay', 'logo', 'forceQuality'],
            playerID: 'www.dailymotion.com/embed/video/',
            protocol: 'http://',
            playerRegExp: /(http:\/\/)www\.dailymotion\.com\/video\/([A-Za-z0-9]+)/
        }
    };
    var players = [];
    angular.forEach(configurations, function (value) {
        players.push(PlayerConfig.createInstance(value));
    });
    return players;
}]);
angular.module('videosharing-embed').directive('embedVideo', [ '$filter' , 'RegisteredPlayers', function ($filter, RegisteredPlayers) {
	'use strict';
    return {
        restrict: "A",
        template: '<iframe width="{{config.width}}" height="{{config.height}}" src="{{config.protocol}}{{config.playerID}}{{videoID}}{{config.options | videoOptions}}" frameborder="0"></iframe>',
        scope : {},
		replace : true,
        link: function ($scope, element, attrs) {
            var url = attrs.href;
            var player = null;
            
            //search for the right player in the list of registered players
            angular.forEach(RegisteredPlayers, function (value) {
                if (value.isPlayerFromURL(url)) {
                    player = value;
                }
            });
            //get the videoID
            $scope.videoID = url.match(player.playerRegExp)[2];

            //copy configuration from player
            $scope.config = player.config;
            
            //the size of the player is treated differently than to the playback options
            $scope.config.height = (attrs.height && parseInt(attrs.height)) || $scope.config.height;
            $scope.config.width = (attrs.width && parseInt(attrs.width)) || $scope.config.width;
            
            //get the protocol
            $scope.config.protocol = url.match(player.playerRegExp)[1];

            //overwrite playback options
            angular.forEach($filter('whitelist')(attrs, player.whitelist), function (value, key) {
                $scope.config.options[key] = value;
            });
        }
    }
}]);
angular.module('videosharing-embed').filter('videoOptions', function () {
	'use strict';
    return function (options) {
        var opts = [];
        angular.forEach(options, function (value, key) {
            opts.push([key, value].join('='));
        });
        return "?" + opts.join('&');
    }
});
angular.module('videosharing-embed').filter('whitelist', function () {
	'use strict';
    return function (options, whitelist) {
        var filteredOptions = {};
        angular.forEach(options, function (value, key) {
            if (whitelist.indexOf(key) != -1) filteredOptions[key] = value;
        });
        return filteredOptions;
    }
});