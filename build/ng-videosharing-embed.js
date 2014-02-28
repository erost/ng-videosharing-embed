/**
 * Embed videos using AngularJS directives
 * @version v0.1.9 - 2014-02-28
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
            playerRegExp: /(http:\/\/|https:\/\/)(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)(\w*)(&(amp;)?[\w\?=]*)?/
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
            playerRegExp: /(http:\/\/|https:\/\/)(www\.youtube\-nocookie\.com)\/watch\?v=([A-Za-z0-9\-\_]+)/
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
angular.module('videosharing-embed').directive('embedVideo', [ '$filter' , 'RegisteredPlayers', '$sce', function ($filter, RegisteredPlayers, $sce) {
	'use strict';
    return {
        restrict: "A",
        template: '<iframe width="{{width}}" height="{{height}}" data-ng-src="{{trustedVideoSrc}}" frameborder="0"></iframe>',
        scope : {
            height: '@height',
            width: '@width'
        },
        link: function ($scope, $element, $attrs) {
            //handle the use of both ng-href and href
            $attrs.$observe('href', function(url) {
				if(url === undefined)
					return;
				var player = null;
            
				//search for the right player in the list of registered players
				angular.forEach(RegisteredPlayers, function (value) {
					if (value.isPlayerFromURL(url)) {
						player = value;
					}
				});
				if(player === null)
				    return; //haven't found a match for a valid registered player
				
				//get the videoID
				var videoID = url.match(player.playerRegExp)[2];

				//copy configuration from player
				var config = player.config;
            
				//get the protocol
				var protocol = url.match(player.playerRegExp)[1];

				//overwrite playback options
				angular.forEach($filter('whitelist')($attrs, player.whitelist), function (value, key) {
					config.options[key] = value;
				});
			
				//build and trust the video URL
				var untrustedVideoSrc = protocol + config.playerID + videoID + $filter('videoOptions')(config.options);
				$scope.trustedVideoSrc = $sce.trustAsResourceUrl(untrustedVideoSrc);
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