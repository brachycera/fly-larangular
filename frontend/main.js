(function() {

    'use strict';

    /**
     * Angular Main Starter Module
     * @constructor
     */
    angular.module('app', [
        'app.constants',
        'app.config',
        'module.templates',
        'module.api',
        'module.landingPage',
        'ui.router',
        'restangular'
    ]);

    angular.module('app.constants', [ ]);
    angular.module('app.config', [ 'restangular', 'app.constants' ]);

})();