(function() {

    'use strict';

    /**
     * Global Configuration Constants
     * @param object
     */
    var constants = (function () {

        return {
            appHost                 : 'HOSTNAME',
            routesTplPathPrefix     : '../frontend/components/',
            RestangularBaseUrl      : 'API_URL'
        };

    })();


    angular.module('app.constants').constant(
        'CONSTANTS',
        constants
    );

})();