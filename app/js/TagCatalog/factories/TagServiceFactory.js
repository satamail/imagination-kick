"use strict";
/* Implimintation of tag service factoryr */

(function(angular) {
    function TagServiceFactory($rootScope)
    {
        function TagService(tagResource) {
            this.getTagList = function(args)
            {
                args = args || {};
                var result = tagResource.query.call(this, args);
                $rootScope.$emit('tagcatalog.tagservice.update.taglist', result);
                return result;
            }
        }
        return TagService;
    }

    angular.module('TagCatalog')
        .factory('TagServiceFactory', ["$rootScope", TagServiceFactory]);
})(angular);
