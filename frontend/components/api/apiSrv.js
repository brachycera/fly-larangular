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