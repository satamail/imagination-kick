"use strict";
/* Implimintation of tag service factoryr */

(function(angular) {
    function TagServiceFactory()
    {
        function TagService(tagResource)
        {

            function prepearParams(count, tagpath, args)
            {
                var result = args ? angular.copy(args) : {};
                result.tagpath = tagpath || '';
                result.count = count || -1;
                return result;
            }

            function loadTagList(params)
            {
                return tagResource.query(params);
            }

            this.getTagList = function getTagList(count, tagpath, args)
            {
                var params = prepearParams(count, tagpath, args);
                var result = loadTagList(params);
                return result;
            };
        }
        return TagService;
    }

    angular.module('TagCatalog')
        .factory('TagServiceFactory', TagServiceFactory);
})(angular);
