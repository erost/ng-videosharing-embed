angular.module('videosharing-embed').directive('embedVideo', [ '$filter' , 'RegisteredPlayers', '$sce', '$window', function ($filter, RegisteredPlayers, $sce, $window) {
	'use strict';
    return {
        restrict: "E",
        template: '<iframe data-ng-attr-id="{{id}} "width="{{width}}" height="{{height}}" data-ng-src="{{trustedVideoSrc}}" allowfullscreen frameborder="0"></iframe>',
        scope: {
            height: '@',
            width: '@',
            onChange: '&',
        },
        link: function ($scope, $element, $attrs) {
            var currentHref = undefined;

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
                if (!url || url === currentHref) {
                    return;
                }
                currentHref = url;
                var player = null;
                //search for the right player in the list of registered players
                angular.forEach(RegisteredPlayers, function (value) {
                    if (value.isPlayerFromURL(url)) {
                        player = value;
                    }
                });

                if (player === null) {
                    //haven't found a match for a valid registered player
                    $scope.onChange();
                    return $element.remove();
                }

                var parameters = url.match(player.playerRegExp);

                var videoID = parameters[2],
                    protocol = parameters[1],
                    time = url.match(player.timeRegExp),
                    config = player.config;

                //overwrite playback options
                angular.forEach($filter('whitelist')($attrs, player.whitelist), function (value, key) {
                    var normalizedKey = player.transformAttrMap[key] != undefined ? player.transformAttrMap[key] : key;
                    player.settings[normalizedKey] = value;
                });

                player.settings.start = 0;

                if (time) {
                    switch (player.type) {
                        case "youtube":
                            player.settings.start += (parseInt(time[2] || "0") * 60 * 60 );
                            player.settings.start += (parseInt(time[4] || "0") * 60 );
                            player.settings.start += (parseInt(time[6] || "0"));
                            break;

                        case "dailymotion":
                            player.settings.start += (parseInt(time[1] || "0"));
                            break;

                        default:
                            break;
                    }
                }

                //check if there is a need to add additional resources to the page...
                if(player.isAdditionaResRequired()) {
                    var body = angular.element($window.document.querySelector('body'));
                    for(var r = 0; r < player.additionalRes.length; r++) {
                        var res = player.additionalRes[r];
                        if($window.document.querySelector('#'+res.id) == null) {
                            body.append(res.element);
                        }
                    }
                }

                // Call callback
                $scope.onChange({videoId: videoID, provider: player.type});

                //build and trust the video URL
                var untrustedVideoSrc = player.buildSrcURL(protocol, videoID);
                $scope.trustedVideoSrc = $sce.trustAsResourceUrl(untrustedVideoSrc);
            });
        }
    }
}]);
