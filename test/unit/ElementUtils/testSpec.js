"use strict"

/* Unit test to ElementUtils */



describe('ElementUtils hasAttribute test:', function() {
    var ElementUtils;

    beforeEach(module('ElementUtils'));

    beforeEach(inject(function ($injector)
    {
        ElementUtils = $injector.get('ElementUtils');
    }));

    it('should check is element has attribute', function ()
    {
        var element = angular.element('<h1 attr>hWithAttr</h1>');
        var isAttrSet = ElementUtils.hasAttribute(element, 'attr');
        expect(isAttrSet).toBe(true);

        var isAttrSet = ElementUtils.hasAttribute(element, 'other_attribute');
        expect(isAttrSet).toBe(false);

        var element = angular.element('<h1 attr="someVal">hWithAttr</h1>');
        var isAttrSet = ElementUtils.hasAttribute(element, 'attr');
        expect(isAttrSet).toBe(true);

        var isAttrSet = ElementUtils.hasAttribute(element, 'other_attribute');
        expect(isAttrSet).toBe(false);
    });
});


describe('ElementUtils getElementByAttr test:', function() {
    var ElementUtils;

    beforeEach(module('ElementUtils'));

    beforeEach(module(function($provide)
    {
        var element = angular.element(
            '<div> \
                <a attr="a">spanWithAttr</a> \
             </div>');
        $provide.value('$rootElement', element);
    }));

    beforeEach(inject(function ($injector)
    {
        ElementUtils = $injector.get('ElementUtils');
    }));

    it('should find element in specifid element', function ()
    {
        var element = angular.element(
            '<div> \
                <span attr="a">spanWithAttr</span> \
                <b>Text</b> \
                <div><h1 attr="a">hWithAttr</h1><div> \
             </div>');

        var elemList = ElementUtils.getElementByAttr('attr', element); // look for element in specifeid element
        expect(elemList.length).toBe(2);
        expect(elemList[0].text()).toBe('spanWithAttr');
        expect(elemList[1].text()).toBe('hWithAttr');
    });

    it("should find element in rootElement, if other not specifid", function ()
    {
        var elemList = ElementUtils.getElementByAttr('attr'); // look for element in the root element
        expect(elemList.length).toBe(1);
        expect(elemList[0].text()).toBe('spanWithAttr');
    });

    it('should find element, even attribute has not value', function ()
    {
        var element = angular.element(
            '<div> \
                <div><h1 attr>hWithAttr</h1><div> \
             </div>');

        var elemList = ElementUtils.getElementByAttr('attr', element);
        expect(elemList.length).toBe(1);
        expect(elemList[0].text()).toBe('hWithAttr');
    });

    it('should find zero element, if there is no element with specifid attr in specifid element', function ()
    {
        var element = angular.element(
            '<div> \
                <div><h1 attr="d">hWithAttr</h1><div> \
             </div>');

        var elemList = ElementUtils.getElementByAttr('anotherAttr', element);
        expect(elemList.length).toBe(0);
    });
});

describe('ElementUtils hasAttributeFromList test:', function() {
    var ElementUtils;

    beforeEach(module('ElementUtils'));

    beforeEach(inject(function ($injector)
    {
        ElementUtils = $injector.get('ElementUtils');
    }));

    it('should find attribute whitch has element, from attrList', function ()
    {
        var element = angular.element('<h1 attr attr_2 attr_3>hWithAttr</h1>');
        var attrList = ElementUtils.hasAttributeFromList(element, ['attr', 'attr_2']);
        expect(attrList).toEqual(['attr', 'attr_2']);

        var attrList = ElementUtils.hasAttributeFromList(element, ['attr', 'attr_2', 'attr_3', 'attr_4']);
        expect(attrList).toEqual(['attr', 'attr_2', 'attr_3']);

        var attrList = ElementUtils.hasAttributeFromList(element, ['attr', 'attr_4']);
        expect(attrList).toEqual(['attr']);

        var attrList = ElementUtils.hasAttributeFromList(element, ['attr_6', 'attr_4']);
        expect(attrList).toEqual([]);

        var attrList = ElementUtils.hasAttributeFromList(element, []);
        expect(attrList).toEqual([]);
    });
});

describe('ElementUtils removeAll test:', function() {
    var ElementUtils;

    beforeEach(module('ElementUtils'));

    beforeEach(inject(function ($injector)
    {
        ElementUtils = $injector.get('ElementUtils');
    }));

    it('should find attribute whitch has element, from attrList', function ()
    {
        var element = angular.element('<div> \
                                        <span></span> \
                                        <span></span> \
                                        <span></span> \
                                        <span></span> \
                                        <a></a> \
                                      </div>');
        var spanList = element.find('span');
        expect(spanList.length).toBe(4);
        ElementUtils.removeAll(spanList);
        var spanList = element.find('span');
        expect(spanList.length).toBe(0);

        ElementUtils.removeAll(spanList);
        var spanList = element.find('span');
        expect(spanList.length).toBe(0);
    });
});


describe('ElementUtils createComment test:', function() {
    var ElementUtils;

    beforeEach(module('ElementUtils'));

    beforeEach(inject(function ($injector)
    {
        ElementUtils = $injector.get('ElementUtils');
    }));

    it('should create comment with speified txt', function ()
    {
        var comment_1 = ElementUtils.createComment("some_text");
        var comment_2 = document.createComment("some_text");
        expect(comment_1.outerText).toEqual(comment_2.outerText);
    });
});

describe('ElementUtils before test:', function() {
    var ElementUtils;

    beforeEach(module('ElementUtils'));

    beforeEach(inject(function ($injector)
    {
        ElementUtils = $injector.get('ElementUtils');
    }));

    it('should add element before another', function ()
    {
        var element = angular.element('<div> \
                                        <span id="someid"></span> \
                                      </div>');
        var someElement = element.find('span');
        var otherElement = angular.element('<span></span>')
        expect(element.children().length).toBe(1);
        ElementUtils.before(someElement, otherElement);
        expect(element.children().length).toBe(2);
        expect(otherElement.next()).toEqual(someElement);
    });
});

describe('ElementUtils clone test:', function() {
    var ElementUtils;

    beforeEach(module('ElementUtils'));

    beforeEach(inject(function ($injector)
    {
        ElementUtils = $injector.get('ElementUtils');
    }));

    it('should clone element', function ()
    {
        var element = angular.element('<div><span id="someid"></span></div>');
        var otherElement = ElementUtils.clone(element);
        expect(otherElement[0].outerHTML).toEqual(element[0].outerHTML);

        element.attr('someattr', 'somevalue');
        expect(otherElement[0].outerHTML).toNotEqual(element[0].outerHTML);
    });

    it('should clone element list', function ()
    {
        var elementList = angular.element('<div><span id="someid"></span></div>');
        var item = angular.element('<span id="someid"></span>');
        elementList.push(item[0]);
        item = angular.element('<a id="someid"></a>');
        elementList.push(item[0]);

        var clonedList = ElementUtils.clone(elementList);

        expect(clonedList.length).toEqual(elementList.length);
        expect(clonedList[0].outerHTML).toEqual(elementList[0].outerHTML);
        expect(clonedList[1].outerHTML).toEqual(elementList[1].outerHTML);
        expect(clonedList[2].outerHTML).toEqual(elementList[2].outerHTML);

        clonedList.attr('someattr', 'somevalue');
        expect(clonedList[0].outerHTML).toNotEqual(elementList[0].outerHTML);
        expect(clonedList[1].outerHTML).toNotEqual(elementList[1].outerHTML);
        expect(clonedList[2].outerHTML).toNotEqual(elementList[2].outerHTML);
    });
});

