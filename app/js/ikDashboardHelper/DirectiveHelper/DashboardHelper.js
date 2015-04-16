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

        /**
         * Normolize valid gear attribute name.
         * Remove dashes and replace letter after it with capital.
         *
         * @param {string} name Valid gear attribute name.
         * @returns {string|undefined} Normilized gear attribute name, or undefined if name is not valid gear name.
         *
         */
        function normolize(name)
        {
            return normolizeName.hasOwnProperty(name) ? normolizeName[name] : undefined;
        }


        /**
         * Determine node gear type and return it name or undefined, if it is not a gear.
         * In case of node has two or more gear attribute function throw error.
         *
         * @param {angular.element} node Element to determine gear type.
         * @returns {string | undefined} Gear type name or undefined, if node is not a gear.
         *
         * @throws Attribute error, if node has two or more gear attribute.
         *
         */
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


        /**
         * Generate node gear info, string with ik-gear-id, gear type and attribute value.
         *
         * @param {angular.element} node Element to generate info from.
         * @returns {string} String Representation of gear (ik-gear-id, gear type and attribute value).
         *
         * @throws Gear type error, in case of specified node is not a gear.
         * @throws Attribute error, in case if gear type has two or more gear attribute
         *
         * @see getGearType
         *
         */
        function getGearInfo(node)
        {
            var gearType = self.getGearType(node);
            var action = undefined;
            if (angular.isDefined(gearType))
            {
                var attrList = ['ik-gear-id', gearType]
                action = 'ikGearId: ' + node.attr('ik-gear-id') + ' '
                    + self.normolize(gearType) + ': ' + node.attr(gearType);
            }
            else
            {
                throw $minErr('Gear type error', 'Node is not a gear');
            }
            return action;
        }


        /**
         * Check is node a gear.
         *
         * @param {angular.element} node Element to check.
         * @returns {boolean} True, if node is gear, false, otherwise.
         *
         * @throws Attribute error, if node has two or more gear attribute.
         *
         * @see getGearType
         */
        function isGear(node)
        {
            return angular.isDefined(self.getGearType(node)) ? true: false;
        }

        /**
         * Filter gears from not gear element.
         *
         * @param {angular.element} elementList Element list to filter.
         * @returns {angular.element} Element array only with gears.
         *
         * @throws Attribute error, if some node has two or more gear attribute.
         *
         * @see isGear
         *
         */
        function getGearsFromList(elementList)
        {
            var gearList = angular.element();
            for(var i = 0; i < elementList.length; i++)
            {
                var element = elementList.eq(i);
                if (self.isGear(element))
                {
                    gearList.push(element[0]);
                }
            }
            return gearList;
        }

        var self = {
            isGear: isGear,
            normolize: normolize,
            getGearsFromList: getGearsFromList,
            getGearInfo: getGearInfo,
            getGearType: getGearType
        }
        return self;
    }

    angular.module('ikDashboardHelper')
    .service(
        'DashboardHelper', ['ElementUtils', DashboardHelper]
    )
})(angular)
