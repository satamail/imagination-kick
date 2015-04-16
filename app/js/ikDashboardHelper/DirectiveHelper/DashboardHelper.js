"use strict";

(function(angular) {

    function DashboardHelper(elementUtils, queueItemFactory)
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
         * Denormolize valid gear type.
         * Remove capital leter with dashes and it normal analog.
         *
         * @param {string} name Valid gear type.
         * @returns {string|undefined} Valid gear attribute name, or undefined if name is not valid gear name.
         *
         */
        function denormolize(name)
        {
            var attr = undefined;
            for(var key in normolizeName)
            {
                if (normolizeName[key] === name)
                {

                    attr = key;
                    break;
                }
            }
            return attr;
        }


        /**
         * Determine node gear type and return it name or undefined, if it is not a gear.
         * In case of node has two or more gear attribute function throw error.
         *
         * @param {angular.element} node Element to determine gear type.
         * @returns {string | undefined} Normolized gear type name or undefined, if node is not a gear.
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
            return (gearAttrList.length == 0) ? undefined : normolize(gearAttrList[0]);
        }

        /**
         * Create gear quoue item from template and transclude func.
         * Determine template gear type and create queue item.
         *
         * @param {trascludeFn} gear Transclude func for template.
         * @param {angular.element} template Element with gear template.
         * @return {object} Gear queue item, whitch contains gear type, transcludeFn and aditional data.
         *
         * @throws Attribute error, if node has two or more gear attribute.
         *
         * @see getGearType
         *
         */
        function createGearQueueItem(gear, template)
        {
            var type = self.getGearType(template);
            return queueItemFactory(gear, template, type);
        }

        /**
         * Get, from specified list, gear with specified type.
         * Look trought specified list, then get gear type and,
         * if gear type equal specified type, add it to result array
         *
         * @param {angular.element} gearList List with gear templates.
         * @param {string} type Type to get gears with.
         *
         * @throws Attribute error, if node has two or more gear attribute.
         *
         * @see getGearType
         *
         */
        function getGearWithType(gearList, type)
        {
            var result = angular.element();
            angular.forEach(gearList, function(gear)
            {
                if (self.getGearType(gear) == type)
                {
                    result.push(gear);
                }
            });
            return result;
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
                var attrName = self.denormolize(gearType);
                action = 'ikGearId: ' + node.attr('ik-gear-id') + ' '
                    + gearType + ': ' + node.attr(attrName);
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
            getGearType: getGearType,
            getGearWithType: getGearWithType,
            createGearQueueItem: createGearQueueItem,
            denormolize: denormolize
        }
        return self;
    }

    angular.module('ikDashboardHelper')
    .service(
        'DashboardHelper', ['ElementUtils', 'GearQueueItemFactory', DashboardHelper]
    )
})(angular)
