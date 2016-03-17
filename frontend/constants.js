(function() {

    'use strict';

    /**
     * Global Configuration Constants
     * @param object
     */
    var constants = (function () {

        return {
            appHost                 : '',
            routesTplPathPrefix     : '',
            RestangularBaseUrl      : ''
        };

    })();

    angular.module('app.constants').constant(
        'CONSTANTS',
        constants
    );

})();