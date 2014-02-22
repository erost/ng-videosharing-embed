angular.module('videosharing-embed').directive('embedVideo', [ '$filter' , 'RegisteredPlayers', '$sce', function ($filter, RegisteredPlayers, $sce) {
	'use strict';
    return {
        restrict: "A",
        template: '<iframe width="{{width}}" height="{{height}}" data-ng-src="{{trustedVideoSrc}}" frameborder="0"></iframe>',
        scope : {
			url: '@href'
			},
		replace : true,
        link: function ($scope, element, attrs) {
            var url = $scope.url;
            var player = null;
            
            //search for the right player in the list of registered players
            angular.forEach(RegisteredPlayers, function (value) {
                if (value.isPlayerFromURL(url)) {
                    player = value;
                }
            });
            //get the videoID
            var videoID = url.match(player.playerRegExp)[2];

            //copy configuration from player
            var config = player.config;
            
            //the size of the player is treated differently than to the playback options
            $scope.height = (attrs.height && parseInt(attrs.height)) || config.height;
            $scope.width = (attrs.width && parseInt(attrs.width)) || config.width;
            
            //get the protocol
            var protocol = url.match(player.playerRegExp)[1];

            //overwrite playback options
            angular.forEach($filter('whitelist')(attrs, player.whitelist), function (value, key) {
                config.options[key] = value;
            });
			
			//build and trust the video URL
			var untrustedVideoSrc = protocol + config.playerID + videoID + $filter('videoOptions')(config.options);
			$scope.trustedVideoSrc = $sce.trustAsResourceUrl(untrustedVideoSrc);
        }
    }
}]);