angular.module('videosharing-embed').filter('videoSettings', function () {
	'use strict';
    return function (settings) {
        var params = [];
        angular.forEach(settings, function (value, key) {
            params.push([key, value].join('='));
        });
        return params.length > 0 ? "?" + params.join('&') : "";
    }
});