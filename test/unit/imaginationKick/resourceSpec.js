"use strict"

/* Unit test to cart resource */

describe('CardResource test:', function() {
    var $httpBackend;
    var $rootScope;
    var cardResource;

    beforeEach(module('ImaginationKick'));


    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');
        cardResource = $injector.get('CardResource');
    }));

    it('should send a request to card/get and get card', function () {
        $httpBackend.expect('GET', '/app/card/get').respond(200, [{tag:["tag"], image:"image"}]);
        var cardList = cardResource.query();
        $httpBackend.flush();
        expect(cardList[0].image).toBe("image");
    });
});

describe('TagResource test:', function() {
    var $httpBackend;
    var $rootScope;
    var cardResource

    beforeEach(module('ImaginationKick'));


    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');
        cardResource = $injector.get('TagResource');
    }));

    it('should send a request to card/tag and get tag', function () {
        $httpBackend.expect('GET', '/app/card/tag').respond(200, [{name:"tag", childrenOunt:20}]);
        var tagList = cardResource.query();
        $httpBackend.flush();
        expect(tagList[0].name).toBe("tag");
    });
});
