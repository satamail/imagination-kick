"use strict";
/* Implimintation of tag service factoryr */

(function(angular) {
    function CardServiceFactory($rootScope)
    {
        function CardService(cardResource) {

            function prepearParams(count, tagpath, args)
            {
                var result = args ? angular.copy(args) : {};
                result.tagpath = tagpath || '';
                result.count = count || -1;
                return result;
            }

            function loadCardList(params)
            {
                return cardResource.query(params);
            }

            this.getCardList = function(count, tagpath, args)
            {
                var params = prepearParams(count, tagpath, args);
                var result = loadCardList(params);
                return result;
            }
        }
        return CardService;
    }

    angular.module('TagCatalog')
        .factory('CardServiceFactory', ["$rootScope", CardServiceFactory]);
})(angular);
