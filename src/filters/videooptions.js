angular.module('videosharing-embed').filter('videoOptions', function () {
	'use strict';
    return function (options) {
        var opts = [];
        angular.forEach(options, function (value, key) {
            opts.push([key, value].join('='));
        });
        return opts.length > 0 ? "?" + opts.join('&') : "";
    }
});