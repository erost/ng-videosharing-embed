angular.module('embedplayer').filter('whitelist', function () {
    return function (options, whitelist) {
        var filteredOptions = {};
        angular.forEach(options, function (value, key) {
            if (whitelist.indexOf(key) != -1) filteredOptions[key] = value;
        });
        return filteredOptions;
    }
});