"use strict";

(function(angular) {
    function DashboardNodeFactory(dashboardHelper, elementUtils, $document)
    {
        function DashboardNode(element)
        {
            this.getGearTemplateList = function getGearTemplateList()
            {
                var children = element.children();
                var gearList = dashboardHelper.getGearsFromList(children);
                return gearList;
            }

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

            this.markGearTemplate = function markGearTemplate()
            {
                var templateList = this.getGearTemplateList();
                angular.forEach(templateList, function markWithComment(template)
                {
                    var element = angular.element(template);
                    var info = dashboardHelper.getGearInfo(element);
                    var infoNode = document.createComment(' ' + info + ' ');
                    infoNode = angular.element(infoNode);
                    element.after(infoNode);
                    var infoNodeEnd = document.createComment(' end ' + info + ' ');
                    infoNode.after(infoNodeEnd);
                });
            }

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
