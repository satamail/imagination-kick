"use strict";
/* Implimintation of tag service factoryr */

(function(angular) {
    function CardServiceFactory($rootScope)
    {
        function CardService(cardResource) {
            this.getCardList = function(args)
            {
                args = args || {};
                var result = cardResource.query.call(this, args);
                $rootScope.$emit('tagcatalog.cardservice.update.cardlist', result);
                return result;
            }
        }
        return CardService;
    }

    angular.module('TagCatalog')
        .factory('CardServiceFactory', ["$rootScope", CardServiceFactory]);
})(angular);
