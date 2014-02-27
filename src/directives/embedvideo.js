angular.module('videosharing-embed').directive('embedVideo', [ '$filter' , 'RegisteredPlayers', '$sce', function ($filter, RegisteredPlayers, $sce) {
	'use strict';
    return {
        restrict: "A",
        template: '<iframe data-ng-src="{{trustedVideoSrc}}" frameborder="0"></iframe>',
        scope : {},
		replace : true,
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