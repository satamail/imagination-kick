"use strict";
/* Implimintation of tag service provider, which contains tag service config */

(function(angular) {
    function TagServiceProvider()
    {
        var self = this;

        var tagSevice = undefined;

        var resourceUrl = undefined;

        var resourceMethods = undefined;

        this.setTagResourceUrl = function setTagResource(tagResourcUrl)
        {
            resourceUrl = tagResourcUrl;
            return self;
        }

        this.setTagResourceMethods = function setTagResourceMethods(tagResourceMethods)
        {
            resourceMethods = tagResourceMethods;
            return self;
        }

        this.$get = ['$resource', function($resource)
        {
            if (angular.isUndefined(tagSevice))
            {
                var tagResource = $resource(resourceUrl, null, resourceMethods);
                tagSevice = new TagService(tagResource);
            }
            return tagSevice;
        }];
    }

    function TagService(tagResource) {
        this.getTagList = function(args)
        {
            var defaults = {
                count: 10
            }
            args = angular.extend(defaults, args);
            return tagResource.query(args);
        }
    }

    angular.module('TagCatalog')
        .provider('TagService', TagServiceProvider);
})(angular);
