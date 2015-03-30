"use strict"

/* Unit test to cart resource */

describe('ImaginationKick card resource', function() {
    var $httpBackend;
    var $rootScope;
    var cardFactory

    beforeEach(module('imaginationKick'));


    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');
        cardFactory = $injector.get('CardFactory');
    }));

    it('should send a request to card/get and get card', function () {
        $httpBackend.expect('GET', '/app/card/get').respond(200, [{tag:["tag"], image:"image"}]);
        var cardList = cardFactory.query();
        $httpBackend.flush();
        expect(cardList[0].image).toBe("image");
    });
});

describe('ImaginationKick tag resource', function() {
    var $httpBackend;
    var $rootScope;
    var tagFactory

    beforeEach(module('imaginationKick'));


    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');
        tagFactory = $injector.get('TagFactory');
    }));

    it('should send a request to card/tag and get tag', function () {
        $httpBackend.expect('GET', '/app/card/tag').respond(200, [{name:"tag", cardCount:20}]);
        var tagList = tagFactory.query();
        $httpBackend.flush();
        expect(tagList[0].name).toBe("tag");
    });
});
