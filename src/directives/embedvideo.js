angular.module('videosharing-embed').directive('embedVideo', [ '$filter' , 'RegisteredPlayers', '$sce', function ($filter, RegisteredPlayers, $sce) {
	'use strict';
    return {
        restrict: "E",
        template: '<iframe width="{{width}}" height="{{height}}" data-ng-src="{{trustedVideoSrc}}" allowfullscreen frameborder="0"></iframe>',
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
                    config.options[key] = value;
                });

                config.options.start = 0;

                if (time) {
                    switch (player.type) {
                        case "youtube":
                            config.options.start += (parseInt(time[2] || "0") * 60 * 60 );
                            config.options.start += (parseInt(time[4] || "0") * 60 );
                            config.options.start += (parseInt(time[6] || "0"));
                            break;

                        case "dailymotion":
                            config.options.start += (parseInt(time[1] || "0"));
                            break;

                        default:
                            break;
                    }
                }

                //build and trust the video URL
                var untrustedVideoSrc = '//' + config.playerID + videoID + $filter('videoOptions')(config.options);
                $scope.trustedVideoSrc = $sce.trustAsResourceUrl(untrustedVideoSrc);
            });
        }
    }
}]);
