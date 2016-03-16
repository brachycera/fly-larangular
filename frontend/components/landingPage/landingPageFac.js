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