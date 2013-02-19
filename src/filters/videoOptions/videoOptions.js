angular.module('embedplayer').filter('videoOptions', function () {
    return function (options) {
        var opts = [];
        angular.forEach(options, function (value, key) {
            opts.push([key, value].join('='));
        });
        return "?" + opts.join('&');
    }
});