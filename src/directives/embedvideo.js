angular.module('videosharing-embed').directive('embedVideo', [ '$filter' , 'RegisteredPlayers', function ($filter, RegisteredPlayers) {
	'use strict';
    return {
        restrict: "A",
        template: '<iframe width="{{config.width}}" height="{{config.height}}" src="{{config.playerID}}{{videoID}}{{config.options | videoOptions}}" frameborder="0"></iframe>',
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
            $scope.videoID = url.match(player.playerRegExp)[1];

            //copy configuration from player
            $scope.config = player.config;
            
            //the size of the player is treated differently than to the playback options
            $scope.config.height = (attrs.height && parseInt(attrs.height)) || $scope.config.height;
            $scope.config.width = (attrs.width && parseInt(attrs.width)) || $scope.config.width;

            //overwrite playback options
            angular.forEach($filter('whitelist')(attrs, player.whitelist), function (value, key) {
                $scope.config.options[key] = value;
            });
        }
    }
}]);