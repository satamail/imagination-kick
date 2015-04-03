"use strict"

/* Unit test to TagCatalog factories */

describe('TagServiceFactory test:', function() {
    var tagServiceFactory;

    beforeEach(module('TagCatalog'));


    beforeEach(inject(function ($injector) {
        tagServiceFactory = $injector.get('TagServiceFactory');
    }));

    it('should call resuorce query with according parameters', function () {
        var tagResoure = {
            query: function() {
                // DO NOTHING
            }
        }
        spyOn(tagResoure, 'query');
        var tagService = new tagServiceFactory(tagResoure);
        tagService.getTagList();
        expect(tagResoure.query).toHaveBeenCalledWith({});

        tagService.getTagList({count: 10});
        expect(tagResoure.query).toHaveBeenCalledWith({count: 10});

        tagService.getTagList({count: 30, tagpath: 'path'});
        expect(tagResoure.query).toHaveBeenCalledWith({count: 30, tagpath: 'path'});
    });

    it('should return query result from getTagList', function () {
        var tagList = [
            {
                name: 'tag1',
                'childrenCount': 2
            },
            {
                name: 'tag2',
                'childrenCount': 2
            }
        ];
        var tagResoure = {
            query: function() {
                return angular.copy(tagList);
            }
        }
        var tagService = new tagServiceFactory(tagResoure);
        var resultTagResource = tagService.getTagList();
        resultTagResource[0].name = '';
        expect(resultTagResource.toString()).toEqual(tagList.toString());

        resultTagResource = tagService.getTagList({count: 10});
        expect(resultTagResource.toString()).toEqual(tagList.toString());

        resultTagResource = tagService.getTagList({count: 30, tagpath: 'path'});
        expect(resultTagResource.toString()).toEqual(tagList.toString());
    });

});

describe('CardServiceFactory test:', function() {
    var cardServiceFactory;

    beforeEach(module('TagCatalog'));


    beforeEach(inject(function ($injector) {
        cardServiceFactory = $injector.get('CardServiceFactory');

    }));

    it('should call resuorce query with according parameters', function () {
        var cardResoure = {
            query: function() {
                // DO NOTHING
            }
        }
        spyOn(cardResoure, 'query');
        var cardService = new cardServiceFactory(cardResoure);
        cardService.getCardList();
        expect(cardResoure.query).toHaveBeenCalledWith({});

        cardService.getCardList({count: 10});
        expect(cardResoure.query).toHaveBeenCalledWith({count: 10});

        cardService.getCardList({count: 30, tagpath: 'path'});
        expect(cardResoure.query).toHaveBeenCalledWith({count: 30, tagpath: 'path'});
    });

    it('should return query result from getTagList', function () {
        var cardList = [
            {
                name: 'tag1',
                'childrenCount': 2
            },
            {
                name: 'tag2',
                'childrenCount': 2
            }
        ];
        var cardResource = {
            query: function() {
                return angular.copy(cardList);
            }
        }
        var cardService = new cardServiceFactory(cardResource);
        var resultCardResource = cardService.getCardList();
        expect(resultCardResource).toEqual(cardList);

        resultCardResource = cardService.getCardList({count: 10});
        expect(resultCardResource.toString()).toEqual(cardList.toString());

        resultCardResource = cardService.getCardList({count: 30, tagpath: 'path'});
        expect(resultCardResource.toString()).toEqual(cardList.toString());
    });

});
