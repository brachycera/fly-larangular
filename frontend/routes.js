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