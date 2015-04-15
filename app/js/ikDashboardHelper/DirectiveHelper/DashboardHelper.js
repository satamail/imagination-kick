"use strict";

(function(angular) {

    function DashboardHelper(elementUtils)
    {
        var $minErr = angular.$$minErr('DashboardHelper');

        var gearAttributeList = [
            'ik-gear-repeat'
        ];

        var normolizeName = {
            'ik-gear-repeat': 'ikGearRepeat',
            'ik-gear-id': 'ikGearId'
        }

        function normolize(name)
        {
            return normolizeName[name];
        }

        function getGearType(node)
        {
            var gearAttrList = elementUtils.hasAttributeFromList(node, gearAttributeList);
            if (gearAttrList.length > 1)
            {
                var attr = gearAttrList.join(', ');
                throw $minErr('Attribute error',
                                "Gear can not has more then one gear attribute, but one has {0}", attr);
            }
            return (gearAttrList.length == 0) ? undefined : gearAttrList[0];
        }

        function getGearInfo(node)
        {
            var gearType = getGearType(node);
            var action = undefined;
            if (angular.isDefined(gearType))
            {
                var attrList = ['ik-gear-id', gearType]
                action = 'ikGearId: ' + node.attr('ik-gear-id') + ' '
                    + normolize(gearType) + ': ' + node.attr(gearType);
            }
            else
            {
                throw $minErr('Gear type error', 'Node is not a gear');
            }
            return action;
        }

        function isGear(node)
        {
            return angular.isDefined(getGearType(node)) ? true: false;
        }

        function getGearsFromList(elementList)
        {
            var gearList = angular.element();
            for(var i = 0; i < elementList.length; i++)
            {
                var element = elementList.eq(i);
                if (isGear(element))
                {
                    gearList.push(element[0]);
                }
            }
            return gearList;
        }
        return {
            isGear: isGear,
            normolize: normolize,
            getGearsFromList: getGearsFromList,
            getGearInfo: getGearInfo
        }
    }

    angular.module('ikDashboardHelper')
    .service(
        'DashboardHelper', ['ElementUtils', DashboardHelper]
    )
})(angular)
