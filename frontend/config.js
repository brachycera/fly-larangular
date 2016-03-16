(function() {

    'use strict';

    /**
     * Global Configuration
     * @param object - RestangularProvider, global settings for REST Api
     * @param object - CONSTANTS, global configuration constants
     */
    function config( RestangularProvider, CONSTANTS ) {

        RestangularProvider.setBaseUrl( CONSTANTS.RestangularBaseUrl );

    }


    angular.module('app.config').config([
        'RestangularProvider',
        'CONSTANTS',
        config
    ]);

})();