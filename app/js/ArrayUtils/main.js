"use strict";

(function(angular) {

    function ArrayUtilsService()
    {
        var self = this;
        self.detectDeleted = function detectDeleted(oldArr, newArr, eqFn)
        {
            eqFn = eqFn || angular.equals;
            var result = new Array(oldArr.length);
            for (var i = 0; i < oldArr.length; i++)
            {
                result[i] = true;
                for (var j = 0; j < newArr.length; j++)
                {
                    if (eqFn(oldArr[i], newArr[j]))
                    {
                        result[i] = false;
                        break;
                    }
                }
            }
            return result;
        };

        self.detectNew = function detectNew(oldArr, newArr, eqFn)
        {
            eqFn = eqFn || angular.equals;
            var result = new Array(newArr.length);
            for (var i = 0; i < newArr.length; i++)
            {
                result[i] = true;
                for (var j = 0; j < oldArr.length; j++)
                {
                    if (eqFn(newArr[i], oldArr[j]))
                    {
                        result[i] = false;
                        break;
                    }
                }
            }
            return result;
        };

        self.detectMove = function detectMove(oldArr, newArr, eqFn)
        {
            eqFn = eqFn || angular.equals;
            var del = self.detectDeleted(oldArr, newArr, eqFn);
            var oldWithoutDel = [];
            for (var i = 0; i < oldArr.length; i++)
            {
                if (del[i] == false)
                {
                    oldWithoutDel.push({index: i, value:oldArr[i]});
                }
            }
            var nw = self.detectNew(oldArr, newArr, eqFn);
            var newWithoutNew = [];
            for (var i = 0; i < newArr.length; i++)
            {
                if (nw[i] == false)
                {
                    newWithoutNew.push({index: i, value:newArr[i]});
                }
            }

            var result = new Array(newArr.length);
            self.setAll(result, false);
            for (var i = 0; i < newWithoutNew.length; i++)
            {
                if (eqFn(oldWithoutDel[i].value, newWithoutNew[i].value) == false)
                {
                    result[newWithoutNew[i].index] = true;
                }
            }
            return result;
        }

        self.setAll = function setAll(arr, value)
        {
            for (var i = 0; i < arr.length; i++)
            {
                arr[i] = value;
            }
        }
    }
    angular.module('ArrayUtils', [])
    .service('ArrayUtils', ArrayUtilsService);
})(angular)
