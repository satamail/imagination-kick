"use strict";

(function(angular) {

    function GearQueueItemFactory(ElementUtils)
    {
        var proccessors = {
            ikGearRepeat: function(template)
            {
                return {
                    repeatExpr: template.attr('ik-gear-repeat')
                }
            }
        };

        return function (gear, template, type) {
            var item = proccessors[type](template);
            item.type = type;
            item.transclude = gear;
            item.template = template;
            return item;
        }
    }

    angular.module('ikDashboardHelper')
    .factory(
        'GearQueueItemFactory', ['ElementUtils', GearQueueItemFactory]
    )
})(angular)
