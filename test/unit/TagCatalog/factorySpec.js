"use strict"

/* Unit test to TagCatalog factories */

describe('TagServiceFactory test:', function() {
    var tagServiceFactory;

    beforeEach(module('TagCatalog'));


    beforeEach(inject(function ($injector) {
        tagServiceFactory = $injector.get('TagServiceFactory');
    }));

    it('should call resuorce query with default parameters', function () {
        var tagResoure = {
            query: function(params) {
                // DO NOTHING
            }
        }
        var defaultParams = {
            count: -1,
            tagpath:''
        };
        spyOn(tagResoure, 'query');
        var tagService = new tagServiceFactory(tagResoure);
        tagService.getTagList(); // getTagList should all tagResource.query with default params
        expect(tagResoure.query).toHaveBeenCalledWith(defaultParams);
    });

    it('should call resuorce query with according parameters', function () {
        var tagResoure = {
            query: function(params) {
                // DO NOTHING
            }
        }
        spyOn(tagResoure, 'query');
        var tagService = new tagServiceFactory(tagResoure);

        var customCount = 10;
        var paramsToQueryWithCustomCount = {
            count: customCount, // value of getTagList first argument
            tagpath: '' // Default value
        };
        tagService.getTagList(customCount);
        expect(tagResoure.query).toHaveBeenCalledWith(paramsToQueryWithCustomCount);

        var customTagpath = 'custom/tag/path';
        var paramsToQueryWithCustomParams = {
            count: customCount, // value of getTagList's first argument
            tagpath: customTagpath // value of getTagList's second argument
        };
        tagService.getTagList(customCount, customTagpath);
        expect(tagResoure.query).toHaveBeenCalledWith(paramsToQueryWithCustomParams);

        var customArgs = {
            someCustomArg: 'somevalue',
            anotherCustomArg: 'anotherValue'
        };
        var paramsToQueryWithAdditionalParams = {
            count: customCount, // value of getTagList's first argument
            tagpath: customTagpath, // value of getTagList's second argument
            someCustomArg: customArgs.someCustomArg, // value from getTagList's third argument
            anotherCustomArg: customArgs.anotherCustomArg // value from getTagList's third argument
        };
        tagService.getTagList(customCount, customTagpath, customArgs);
        expect(tagResoure.query).toHaveBeenCalledWith(paramsToQueryWithAdditionalParams);
    });

    it('should return query result from getTagList', function () {
        var customPath = 'tag\path';
        var tagList = [
            {
                name: 'tag1',
                'childrenCount': 2
            }
        ];
        var anotherTagList = [
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
            query: function(args) {
                var result = [];
                if (args.count == tagList.length)
                {
                    result = angular.copy(tagList);
                }
                else if ((args.count == anotherTagList.length) && (args.tagpath == customPath))
                {
                    result = angular.copy(anotherTagList);
                }
                return result;
            }
        }
        var tagService = new tagServiceFactory(tagResoure);

        var resultTagResource = tagService.getTagList(tagList.length);
        expect(resultTagResource.toString()).toEqual(tagList.toString());

        resultTagResource = tagService.getTagList(anotherTagList.length, customPath);
        expect(resultTagResource.toString()).toEqual(anotherTagList.toString());
    });

});

describe('CardServiceFactory test:', function() {
    var cardServiceFactory;

    beforeEach(module('TagCatalog'));


    beforeEach(inject(function ($injector) {
        cardServiceFactory = $injector.get('CardServiceFactory');

    }));

    it('should call resuorce query with default parameters', function () {
        var cardResoure = {
            query: function(params) {
                // DO NOTHING
            }
        }
        var defaultParams = {
            count: -1,
            tagpath:''
        };
        spyOn(cardResoure, 'query');
        var cardService = new cardServiceFactory(cardResoure);
        cardService.getCardList(); //
        expect(cardResoure.query).toHaveBeenCalledWith(defaultParams);
    });


    it('should call resuorce query with according parameters', function () {
        var cardResoure = {
            query: function(params) {
                // DO NOTHING
            }
        }
        spyOn(cardResoure, 'query');
        var cardService = new cardServiceFactory(cardResoure);

        var customCount = 10;
        var paramsToQueryWithCustomCount = {
            count: customCount, // value of getCardList first argument
            tagpath: '' // Default value
        };
        cardService.getCardList(customCount);
        expect(cardResoure.query).toHaveBeenCalledWith(paramsToQueryWithCustomCount);

        var customTagpath = 'custom/tag/path';
        var paramsToQueryWithCustomParams = {
            count: customCount, // value of getCardList's first argument
            tagpath: customTagpath // value of getCardList's second argument
        };
        cardService.getCardList(customCount, customTagpath);
        expect(cardResoure.query).toHaveBeenCalledWith(paramsToQueryWithCustomParams);

        var customArgs = {
            someCustomArg: 'somevalue',
            anotherCustomArg: 'anotherValue'
        };
        var paramsToQueryWithAdditionalParams = {
            count: customCount, // value of getCardList's first argument
            tagpath: customTagpath, // value of getCardList's second argument
            someCustomArg: customArgs.someCustomArg, // value from getCardList's third argument
            anotherCustomArg: customArgs.anotherCustomArg // value from getCardList's third argument
        };
        cardService.getCardList(customCount, customTagpath, customArgs);
        expect(cardResoure.query).toHaveBeenCalledWith(paramsToQueryWithAdditionalParams);
    });

    it('should return query result from getCardList', function () {
        var customPath = 'tag\path';
        var cardList = [
            {
                name: 'card1',
                tagList: ['sometag', 'another tag'],
                img: 'imgurl',

            }
        ];
        var anotherCardList = [
            {
                name: 'card2',
                tagList: ['tag', 'path', 'thrid tag'],
                img: 'imgurl',

            },
            {
                name: 'card3',
                tagList: ['tag', 'path', 'thrid tag'],
                img: 'imgurl',

            }
        ];
        var cardResoure = {
            query: function(args) {
                var result = [];
                if (args.count == cardList.length)
                {
                    result = angular.copy(cardList);
                }
                else if ((args.count == anotherCardList.length) && (args.tagpath == customPath))
                {
                    result = angular.copy(anotherCardList);
                }
                return result;
            }
        }
        var cardService = new cardServiceFactory(cardResoure);

        var resultCardResource = cardService.getCardList(cardList.length);
        expect(resultCardResource.toString()).toEqual(cardList.toString());

        resultCardResource = cardService.getCardList(anotherCardList.length, customPath);
        expect(resultCardResource.toString()).toEqual(anotherCardList.toString());
    });

});
