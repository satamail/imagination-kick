"use strict";

(function(angular) {
    function ikDashboardCompiler($compile, DashboardNodeFactory, helper)
    {

        function preCompile(element)
        {
            var dashboard = DashboardNodeFactory(element);
            dashboard.indexingGearTemplate();
            var templateList = dashboard.getGearTemplateList();
            templateList = dashboard.cloneGearTemplate();
            dashboard.removeGearTemplate();
            return templateList;
        }

        function compile(templateList)
        {
            var gearList = [];
            angular.forEach(templateList, function compileGear(template, index)
            {
                var gear = $compile(template);
                gearList.push(gear);
            });
            return gearList;
        }

        function createQueue(gearList, templateList)
        {
            var priority = [
                'ikGearRepeat',
                'ikGearFixed',
                'ikGear'
            ]
            var queue = [];
            for (var j = 0; j < priority.length; j++)
            {
                var type = priority[j];
                for (var i = 0; i < gearList.length; i++)
                {
                    var gear = gearList[i];
                    var template = angular.element(templateList[i]);
                    if (helper.getGearType(template, type))
                    {
                        var item = helper.createGearQueueItem(gear, template);
                        queue.push(item);
                    }
                }
            }
            return queue;
        }

        this.getCompileFn = function getCompileFn(linkFnFatory)
        {
            function compileFn(element, attrDict)
            {
                var templateList = preCompile(element);
                var gearList = compile(templateList);
                var gearQueue = createQueue(gearList, templateList);
                return linkFnFatory(gearQueue);
            }
            return compileFn;
        }
    }

    angular.module('ikDashboardHelper')
    .service(
        'ikDashboardCompiler', ['$compile', 'DashboardNodeFactory', 'DashboardHelper', ikDashboardCompiler]
    )
})(angular)
