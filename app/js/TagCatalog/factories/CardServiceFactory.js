"use strict";
/* Implimintation of tag service factoryr */

(function(angular) {
    function CardServiceFactory()
    {
        return CardService;
    }

    function CardService(cardResource) {
        this.getCardList = function(args)
        {
            args = args || {};
            return cardResource.query.call(this, args);
        }
    }

    angular.module('TagCatalog')
        .factory('CardServiceFactory', CardServiceFactory);
})(angular);
