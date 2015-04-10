"use strict";

(function(angular) {
    function ElementUtils($rootElement)
    {
        this.getElementByAttr = function getElementByAttr(attr, context)
        {
            var nodeList = (context || $rootElement).find('*');
            var nodeArray = [];
            var node = null;

            for(var i = 0; i < nodeList.length; i++)
            {
                node = nodeList[i++];
                if (node.attr(attribute))
                {
                    nodeArray.push(node);
                }
            }

            return nodeArray;
        }
    }
    angular.module('ElementUtils')
    .service('ElementUtils', ['$rootElement', ElementUtils]);
})(angular)
