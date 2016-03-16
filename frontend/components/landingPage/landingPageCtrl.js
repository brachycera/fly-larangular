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