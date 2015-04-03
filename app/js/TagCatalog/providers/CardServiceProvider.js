"use strict";
/* Implimintation of tag service provider, which contains tag service config */

(function(angular) {
    function CardServiceProvider()
    {
        var self = this;

        var cardSevice = undefined;

        var resourceUrl = undefined;

        var resourceMethods = undefined;

        this.setCardResourceUrl = function setCardResource(cardResourcUrl)
        {
            resourceUrl = cardResourcUrl;
            return self;
        }

        this.setCardResourceMethods = function setCardResourceMethods(cardResourceMethods)
        {
            resourceMethods = cardResourceMethods;
            return self;
        }

        this.$get = ['$resource', function($resource)
        {
            if (angular.isUndefined(cardSevice))
            {
                var cardResource = $resource(resourceUrl, null, resourceMethods);
                cardSevice = new CardService(cardResource);
            }
            return cardSevice;
        }];
    }

    function CardService(cardResource) {
        this.getCardList = function(args)
        {
            var defaults = {
                count: 20
            }
            args = angular.extend(defaults, args);
            return cardResource.query(args);
        }
    }

    angular.module('TagCatalog')
        .provider('CardService', CardServiceProvider);
})(angular);
