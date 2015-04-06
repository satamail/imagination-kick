"use strict";

/* Service for facade tag catalog services */

(function(angular)
{
    function TagCatalogService(cardServFact, tagServFact, cardRes, tagRes) {
        var cardService = new cardServFact(cardRes);
        var tagService = new tagServFact(tagRes);
        this.getCardList = cardService.getCardList;
        this.getTagList = tagService.getTagList;
    }
    angular.module('ImaginationKick')
        .service('TagCatalogService', ['CardServiceFactory', 'TagServiceFactory',
                                           'CardResource', 'TagResource', TagCatalogService]);
})(angular);
