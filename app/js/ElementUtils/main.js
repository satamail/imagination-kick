"use strict";

(function(angular) {
    function ElementUtils($rootElement)
    {
        var self = this;

        self.getElementByAttr = function getElementByAttr(attr, context)
        {
            var nodeList = (context || $rootElement).find('*');
            var nodeArray = angular.element();
            var node = null;

            for(var i = 0; i < nodeList.length; i++)
            {
                node = nodeList.eq(i);
                if (self.hasAttribute(node, attr))
                {
                    nodeArray.push(node);
                }
            }

            return nodeArray;
        }

        self.hasAttribute = function hasAttribute(element, attribute)
        {
            var attr = element.attr(attribute);
            return (typeof attr !== typeof undefined && attr !== false)
        }

        self.hasAttributeFromList = function hasAttributeFromList(element, attributeList)
        {
            var hasAttribute = [];
            angular.forEach(attributeList, function searchAttributeFromList(attrName)
            {
                if (self.hasAttribute(element, attrName))
                {
                    hasAttribute.push(attrName);
                }
            });
            return hasAttribute;
        }

        self.removeAll = function removeAll(elementList)
        {
            angular.forEach(elementList, function removeElement(element)
            {
                element.remove();
            });
        }

        self.createComment = function createComment(text)
        {
            return document.createComment(text);
        }

        self.before = function before(element, content)
        {
            var node = element[0];
            var insertNode = content[0];
            var parent = node.parentNode;
            parent.insertBefore(insertNode, node);
        }
    }
    angular.module('ElementUtils', [])
    .service('ElementUtils', ['$rootElement', ElementUtils]);
})(angular)
