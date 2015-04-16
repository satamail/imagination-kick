"use strict";

(function(angular) {
    function DashboardNodeFactory(helper, elementUtils)
    {

        /**
         * Wrap to dashboard element which add behavior and usefull methods to simplify work with it.
         *
         * @constructor
         * @param {angular.element} element Node with ikDashboard attribute.
         *
         */
        function DashboardNode(element)
        {
            /**
             * Look throught child nodes of dahsboard node and return only gears.
             *
             * @return {Array} List with gear template elements.
             *
             * @throws Attribute error, if some node has two or more gear attribute.
             *
             * @see DashboardHelper.getGearsFromList
             */
            this.getGearTemplateList = function getGearTemplateList()
            {
                var children = element.children();
                var gearList = helper.getGearsFromList(children);
                return gearList;
            }

            /**
             * Look throught child nodes of dahsboard node and set index to every node.
             * Then mark all template with action info.
             *
             * @throws Attribute error, if some node has two or more gear attribute.
             *
             * @see getGearTemplateList, markGearTemplate
             */
            this.indexingTemplate = function indexingGear()
            {
                var templateList = this.getGearTemplateList();
                angular.forEach(templateList, function indexingTEamplate(template, $index)
                {
                    var element = angular.element(template);
                    element.attr('ik-gear-id', $index);
                });
                this.markGearTemplate();
            }

            /**
             * Look throught child nodes of dahsboard node, get action info
             * for every node and append comment before and after template node.
             *
             * @throws Attribute error, if some node has two or more gear attribute.
             *
             * @see getGearTemplateList
             *
             */
            this.markGearTemplate = function markGearTemplate()
            {
                var templateList = this.getGearTemplateList();
                angular.forEach(templateList, function markWithComment(template)
                {
                    var element = angular.element(template);
                    var info = helper.getGearInfo(element);
                    var infoNode = elementUtils.createComment(' ' + info + ' ');
                    infoNode = angular.element(infoNode);
                    elementUtils.before(element, infoNode);
                    var infoNodeEnd = elementUtils.createComment(' end ' + info + ' ');
                    element.after(infoNodeEnd);
                });
            }

            /**
             * Remove all gear template from dashboard.
             */
            this.removeTemplate = function removeTemplate()
            {
                var templateList = this.getGearTemplateList();
                elementUtils.removeAll(templateList);
            }
        }

        return function create(element)
        {
            return new DashboardNode(element);
        }
    }

    angular.module('ikDashboardHelper')
    .factory(
        'DashboardNodeFactory', ['DashboardHelper', 'ElementUtils', DashboardNodeFactory]
    );
})(angular)
