"use strict";
/* Implimintation of tag service factoryr */

(function(angular) {
    function TagServiceFactory()
    {
        return TagService;
    }

    function TagService(tagResource) {
        this.getTagList = function(args)
        {
            args = args || {};
            return tagResource.query.call(this, args);
        }
    }

    angular.module('TagCatalog')
        .factory('TagServiceFactory', TagServiceFactory);
})(angular);
