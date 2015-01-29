angular.module('videosharing-embed').directive('embedVideo', [ '$filter' , 'RegisteredPlayers', '$sce', function ($filter, RegisteredPlayers, $sce) {
	'use strict';
    return {
        restrict: "E",
        template: '<iframe data-ng-attr-id="{{id}} "width="{{width}}" height="{{height}}" data-ng-src="{{trustedVideoSrc}}" allowfullscreen frameborder="0"></iframe>',
        scope: {
            height: '@',
            width: '@'
        },
        link: function ($scope, $element, $attrs) {
            $attrs.$observe('width', function(w) {
                $scope.width = w;
            });

            $attrs.$observe('height', function(h) {
                $scope.height = h;
            });
            
            $attrs.$observe('iframeId', function(id) {
                $scope.id = id;
            });

            //handle the use of both ng-href and href
            $attrs.$observe('href', function(url) {
                if (url === undefined) {
                    return;
                }

                var player = null;
                //search for the right player in the list of registered players
                angular.forEach(RegisteredPlayers, function (value) {
                    if (value.isPlayerFromURL(url)) {
                        player = value;
                    }
                });

                if (player === null) {
                    return; //haven't found a match for a valid registered player
                }

                var videoID = url.match(player.playerRegExp)[1],
                    time = url.match(player.timeRegExp),
                    config = player.config;

                //overwrite playback options
                angular.forEach($filter('whitelist')($attrs, player.whitelist), function (value, key) {
                    var normalizedKey = config.transformAttrMap[key] != undefined ? config.transformAttrMap[key] : key;
                    config.settings[normalizedKey] = value;
                });

                config.settings.start = 0;

                if (time) {
                    switch (player.type) {
                        case "youtube":
                            config.settings.start += (parseInt(time[2] || "0") * 60 * 60 );
                            config.settings.start += (parseInt(time[4] || "0") * 60 );
                            config.settings.start += (parseInt(time[6] || "0"));
                            break;

                        case "dailymotion":
                            config.settings.start += (parseInt(time[1] || "0"));
                            break;

                        default:
                            break;
                    }
                }
                
                //process the settings for each player
                var settings = player.processSettings(config.settings, videoID);

                //build and trust the video URL
                var untrustedVideoSrc = '//' + config.playerID + videoID + $filter('videoSettings')(settings);
                $scope.trustedVideoSrc = $sce.trustAsResourceUrl(untrustedVideoSrc);
            });
        }
    }
}]);
