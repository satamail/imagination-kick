"use strict"

/* Unit test to DashboardHelperSpec */

describe('DashboardHelper test:', function() {
    var dashboardHelper;

    var elementUtils = {
        hasAttributeFromList: function(node, gearAttributeList)
        {
            // in test moke we use mokeType field to specify node state
            if (node.mockType == 1)
            {
                return [
                    'ik-gear-repeat'
                ]
            }
            else if (node.mockType == 2) // node has 2 gear attr
            {
                // this return value must rise error
                return [
                    'ik-gear-repeat',
                    'some-other'
                ]
            }
            else
            {
                return [];
            }
        }
    }

    beforeEach(module('ikDashboardHelper'));

    beforeEach(module(function($provide)
    {
        $provide.value('ElementUtils', elementUtils);
    }));

    beforeEach(inject(function ($injector)
    {
        dashboardHelper = $injector.get('DashboardHelper');
        spyOn(elementUtils, 'hasAttributeFromList').andCallThrough();
    }));

    it('should get gear type', function() {
        var element = {
            mockType: 1, // state in which node has ik-gear-repeat attribute
        };
        var gearType = dashboardHelper.getGearType(element);
        expect(elementUtils.hasAttributeFromList).toHaveBeenCalled();
        expect(gearType).toBe('ikGearRepeat');
    });

    it('should not get gear type', function() {
        var element = {
            mockType: 3, // state in which node hasn't any gear attribute
        };
        var gearType = dashboardHelper.getGearType(element);
        expect(elementUtils.hasAttributeFromList).toHaveBeenCalled();
        expect(gearType).toBe(undefined);
    });

    it('should throw error insted getting gear type', function() {
        var element = {
            mockType: 2, // state in which node hasn't any gear attribute
        };
        expect(function () {
            dashboardHelper.getGearType(element);
        }).toThrow(
            angular.$$minErr('DashboardHelper')('Attribute error','Gear can not has more then one gear attribute, but one has {0}',
                                                'ik-gear-repeat, some-other'));
        expect(elementUtils.hasAttributeFromList).toHaveBeenCalled();
    });

    it('should told that element is gear', function ()
    {
        var element = 'some angular.element';
        spyOn(dashboardHelper, 'getGearType').andReturn('ik-gear-repeat'); // return valid gear type
        var isGear = dashboardHelper.isGear(element);
        expect(dashboardHelper.getGearType).toHaveBeenCalledWith(element);
        expect(isGear).toBe(true);
    });

    it('should told that element not gear', function ()
    {
        var element = 'some angular.element';
        spyOn(dashboardHelper, 'getGearType').andReturn(undefined); // told that node is not gear
        var isGear = dashboardHelper.isGear(element);
        expect(dashboardHelper.getGearType).toHaveBeenCalledWith(element);
        expect(isGear).toBe(false);
    });

    it('should throw error with element', function ()
    {
        var element = 'some angular.element';
        spyOn(dashboardHelper, 'getGearType').andThrow('some error'); // think that element not valid and throw error

        expect(function () {
            isGear = dashboardHelper.isGear(element);
        }).toThrow('some error');
        expect(dashboardHelper.getGearType).toHaveBeenCalledWith(element);
    });

    it('should normolize ik-gear-repeat and ik-gear-id', function()
    {
        expect(dashboardHelper.normolize('ik-gear-repeat')).toEqual('ikGearRepeat');
        expect(dashboardHelper.normolize('ik-gear-id')).toEqual('ikGearId');
    });

    it('should return undefined from normolize, becouse not valid name', function()
    {
        expect(dashboardHelper.normolize('some-gear-type')).toBe(undefined);
    });

    it('should denormolize ikGearRepeat and ikGearId', function()
    {
        expect(dashboardHelper.denormolize('ikGearRepeat')).toEqual('ik-gear-repeat');
        expect(dashboardHelper.denormolize('ikGearId')).toEqual('ik-gear-id');
    });

    it('should return undefined from denormolize, becouse not valid name', function()
    {
        expect(dashboardHelper.denormolize('someGearType')).toBe(undefined);
    });


    beforeEach(function ()
    {
        spyOn(dashboardHelper, 'normolize').andCallThrough();
    });

    it('should generate gear info', function()
    {
        var element = {
            mockType: 1, // state in which node has ik-gear-repeat attribute
            attr: function(name)
            {
                if (name=='ik-gear-id')
                {
                    return 0;
                }
                else if (name=='ik-gear-repeat')
                {
                    return 'someList';
                }
            }
        };
        spyOn(element, 'attr').andCallThrough();
        spyOn(dashboardHelper, 'getGearType').andReturn('ikGearRepeat'); // return valid gear type
        var info = dashboardHelper.getGearInfo(element);
        expect(dashboardHelper.getGearType).toHaveBeenCalledWith(element);
        expect(info).toEqual('ikGearId: 0 ikGearRepeat: someList');
    });

    it('should throw error if node has 2 or more gear attr', function()
    {
        var element = "some angular.element"
        spyOn(dashboardHelper, 'getGearType').andThrow('some error'); // think that element not valid and throw error
        expect(function () {
            dashboardHelper.getGearInfo(element);
        }).toThrow('some error');
    });

    it('should throw error if node is o a gear', function()
    {
        var element = "some angular.element";
        spyOn(dashboardHelper, 'getGearType').andReturn(undefined); // told that node is not gear
        expect(function () {
            dashboardHelper.getGearInfo(element);
        }).toThrow(
            angular.$$minErr('DashboardHelper')('Gear type error','Node is not a gear'));
    });

    it('should return all gear', function()
    {
        var elementList = [
            ['someelement'],
            ['someelement']
        ];// angular.element moke

        var gearList = angular.element();
        gearList.push('someelement');
        gearList.push('someelement');
        spyOn(dashboardHelper, 'isGear').andReturn(true);
        elementList.eq = function(i)
        {
            return elementList[i];
        }
        expect(dashboardHelper.getGearsFromList(elementList)).toEqual(gearList);
    });

    it('should return no one gear', function()
    {
        var elementList = [
            ['someelement'],
            ['someelement']
        ];// angular.element moke

        var gearList = angular.element();
        spyOn(dashboardHelper, 'isGear').andReturn(false);
        elementList.eq = function(i)
        {
            return elementList[i];
        }
        expect(dashboardHelper.getGearsFromList(elementList)).toEqual(gearList);
    });

    it('should throw error if isGear throw error', function()
    {
        var elementList = [
            ['someelement'],
            ['someelement']
        ];// angular.element moke

        var gearList = angular.element();
        spyOn(dashboardHelper, 'isGear').andThrow('some error');
        elementList.eq = function(i)
        {
            return elementList[i];
        }
        expect(function () {
            dashboardHelper.getGearsFromList(elementList)
        }).toThrow('some error');
    });

    it('should filter gear by type', function()
    {
        var elementList = [
            ['ikGearRepeat'],
            ['ikGearRepeat'],
            ['someGearType'],
            ['ikGearRepeat']
        ];// angular.element list moke

        spyOn(dashboardHelper, 'getGearType').andCallFake(function(gear) {
            return gear;
        });

        var repeatList = dashboardHelper.getGearWithType(elementList, 'ikGearRepeat');
        expect(dashboardHelper.getGearType.calls.length).toBe(4);
        var expectedList = angular.element();
        expectedList.push(['ikGearRepeat']);
        expectedList.push(['ikGearRepeat']);
        expectedList.push(['ikGearRepeat']);
        expect(repeatList.length).toBe(3);
        expect(repeatList).toEqual(expectedList);
    });

    it('should return empty angular.element array', function()
    {
        var elementList = [
        ];// angular.element list moke

        spyOn(dashboardHelper, 'getGearType').andCallFake(function(gear) {
            return gear;
        });

        var repeatList = dashboardHelper.getGearWithType(elementList, 'ikGearRepeat');
        expect(dashboardHelper.getGearType.calls.length).toBe(0);
        var expectedList = angular.element();
        expect(repeatList.length).toBe(0);
        expect(repeatList).toEqual(expectedList);
    });

    it('should return empty angular.element array', function()
    {
        var elementList = [
            ['ikGearRepeat'],
            ['ikGearRepeat'],
            ['someGearType'],
            ['ikGearRepeat']
        ];// angular.element list moke

        spyOn(dashboardHelper, 'getGearType').andCallFake(function(gear) {
            return gear;
        });

        var repeatList = dashboardHelper.getGearWithType(elementList, 'NonExisedType');
        expect(dashboardHelper.getGearType.calls.length).toBe(4);
        var expectedList = angular.element();
        expect(repeatList.length).toBe(0);
        expect(repeatList).toEqual(expectedList);
    });

    it('should throw error from getGearType method', function()
    {
        var elementList = [
            ['ikGearRepeat'],
            ['ikGearRepeat'],
            ['someGearType'],
            ['ikGearRepeat']
        ];// angular.element list moke

        spyOn(dashboardHelper, 'getGearType').andThrow('some error');

        expect(function () {
            dashboardHelper.getGearWithType(elementList, 'ikGearRepeat');
        }).toThrow('some error');
        expect(dashboardHelper.getGearType.calls.length).toBe(1);
    });
});


describe('DashboardHelper createGearQueueItem test:', function() {
    var dashboardHelper;
    var transcludeFn;
    var gearQueueItemFactory;

    beforeEach(module('ElementUtils'));

    beforeEach(module('ikDashboardHelper', function($provide)
    {
        gearQueueItemFactory = jasmine.createSpy('gearQueueItemFactory').andReturn({someField: 'someValue'});
        $provide.value('GearQueueItemFactory', gearQueueItemFactory);
    }));

    beforeEach(inject(function ($injector)
    {
        dashboardHelper = $injector.get('DashboardHelper');
        spyOn(dashboardHelper, 'getGearType').andReturn('someGearType');
        transcludeFn = jasmine.createSpy('gearQueueItemFactory');
    }));

    it('should call getGearType method and return gearQueueItemFactory result', function ()
    {
        var template = angular.element() // it can be empty in this test
        dashboardHelper.createGearQueueItem(transcludeFn, template);
        expect(dashboardHelper.getGearType).toHaveBeenCalledWith(template);
        expect(gearQueueItemFactory).toHaveBeenCalledWith(transcludeFn, template, 'someGearType');
        expect(transcludeFn).not.toHaveBeenCalled();
    });
});


