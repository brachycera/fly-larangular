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
(function() {

    'use strict';

    /**
     * Global Configuration Constants
     * @param object
     */
    var constants = (function () {

        return {
            appHost                 : 'flyweb.dev',
            routesTplPathPrefix     : '../frontend/components/',
            RestangularBaseUrl      : 'http://flyweb.dev/fly-larangular/public/'
        };

    })();


    angular.module('app.constants').constant(
        'CONSTANTS',
        constants
    );

})();
(function() {

    'use strict';

    function configRoutes( $stateProvider, $urlRouterProvider, CONSTANTS ) {

        var getView = function( viewName ){
            return  CONSTANTS.routesTplPathPrefix + viewName + '/' + viewName + '.html';
        };

        $urlRouterProvider.otherwise('/');

        $stateProvider

            .state('landing', {
                        url: '/',
                        views: {
                            main: {
                                    controller: 'landingPageCtrl as vm',
                                    templateUrl: getView('landingPage')
                                }
                            }
            });

    }

    angular.module('app').config([
        '$stateProvider',
        '$urlRouterProvider',
        'CONSTANTS',
        configRoutes
    ]);

})();
(function() {

    'use strict';

    angular.module('module.api', [ ]);

})();
(function() {

    'use strict';

    function apiFactory( Restangular ) {

        function indexData() {
            return Restangular.all('/api').doGET();
        }

        return {
            indexData: indexData
        };

    }

    angular.module('module.api').factory('api', [
        'Restangular',
        apiFactory
    ]);

})();
(function() {

    'use strict';

    angular.module('module.landingPage', []);

})();
(function() {

    'use strict';

    /**
     * landingPageCtrl
     * @param object, $scope - angularJS scope
     * @param object, landingPageFac - Factory for Landingpage Features
     */
    function landingPageCtrl($scope, landingPageFac) {

        var vm = this;

        init();

        /**
         * init Function asks Landing Page Service for data
         * @return {object}
         */
        function init() {

            landingPageFac.getIndex().then( function() {
                vm.result = landingPageFac.result;
            });

        }

    }


    angular.module('module.landingPage').controller('landingPageCtrl', [
        '$scope',
        'landingPageFac',
        landingPageCtrl
    ]);

})();
(function() {

    'use strict';

    function landingPageFac(api) {

        var result = [];

        /**
         * getIndex() - Query REST Api for index data
         * @return {promise}
         */
        function getIndex() {

            return api.indexData().then(
                function ( resultApi ) {
                    result.push( resultApi.data );
                },
                function( error ){
                    console.log(error);
                    console.log('Error:', error.status + ' ' + error.statusText);
                }
            );

        }

        return {
            result: result,
            getIndex: getIndex
        };

    }


    angular.module('module.landingPage').factory('landingPageFac',[
        'api',
        landingPageFac
    ]);

})();
//# sourceMappingURL=app.js.map
