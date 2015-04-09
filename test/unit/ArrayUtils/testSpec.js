"use strict"

/* Unit test to ArrayUtils */

describe('ArrayUtils test:', function() {
    var ArrayUtils;

    beforeEach(module('ArrayUtils'));


    beforeEach(inject(function ($injector) {
        ArrayUtils = $injector.get('ArrayUtils');
    }));

    it('should detect deleted', function () {
        var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        var arr_copy = angular.copy(arr);
        arr_copy = [11, 22].concat(arr_copy.splice(2, 3), arr_copy.splice(5, 7)); // [11, 22, 3, 4, 5, 9]
        var del = ArrayUtils.detectDeleted(arr, arr_copy);
        expect(del.toString()).toBe([true, true, false, false, false, true, true, true, false].toString());

        var del = ArrayUtils.detectDeleted(arr, []);
        expect(del.toString()).toBe([true, true, true, true, true, true, true, true, true].toString());
    });

    it('should detect deleted with specified eqFn', function () {
        var arr = [
            {id: 1, value: 1},
            {id: 2, value: 1},
            {id: 3, value: 1},
            {id: 4, value: 1}
        ];
        var arr_copy = angular.copy(arr);
        arr_copy[0].id = 5;
        arr_copy[3].value = 5;
        function eqFn(item1, item2)
        {
            return item1.id == item2.id;
        }
        var del = ArrayUtils.detectDeleted(arr, arr_copy, eqFn);
        expect(del.toString()).toBe([true, false, false, false].toString());
    });

    it('should detect new', function () {
        var arr = [1, 2, 3, 4, 5];
        var arr_copy = angular.copy(arr);
        arr_copy.push(7);
        arr_copy.push(9);
        arr_copy[2] = 10;
        // arr_copy = [1, 2, 10, 4, 5, 7, 9]
        var nw = ArrayUtils.detectNew(arr, arr_copy);
        expect(nw.toString()).toBe([false, false, true, false, false, true, true].toString());
    });

    it('should detect new with specified eqFn', function () {
        var arr = [
            {id: 1, value: 1},
            {id: 2, value: 1},
            {id: 3, value: 1},
            {id: 4, value: 1}
        ];
        var arr_copy = angular.copy(arr);
        arr_copy[0].id = 5;
        arr_copy[3].value = 5;
        function eqFn(item1, item2)
        {
            return item1.id == item2.id;
        }
        var del = ArrayUtils.detectNew(arr, arr_copy, eqFn);
        expect(del.toString()).toBe([true, false, false, false].toString());
    });

    it('should detect move', function () {
        var arr_1 = [1, 2, 3, 4, 5];
        var arr_2 = [1, 5, 4, 3, 2];
        var mv = ArrayUtils.detectMove(arr_1, arr_2); // just move case
        expect(mv.toString()).toBe([false, true, true, true, true].toString());

        var arr_1 = [1, 2, 3, 4, 5, 6];
        var arr_2 = [1, 5, 2, 6];
        var mv = ArrayUtils.detectMove(arr_1, arr_2); // just move and delete case
        // it cut off deleted items and compare arr
        // arr_1 = [1, 2, 5, 6]
        // arr_2 = [1, 5, 2, 6]
        // first and last is not moved;
        expect(mv.toString()).toBe([false, true, true, false].toString());

        var arr_1 = [1, 2, 3, 4, 5, 6];
        var arr_2 = [1, 5, 3, 2, 4, 7, 6];
        var mv = ArrayUtils.detectMove(arr_1, arr_2); // just move and add case
        // new items is not moved, it cat of new item and compare arr
        // arr_1 = [1, 2, 3, 4, 5, 6]
        // arr_1 = [1, 5, 3, 2, 4, 6]
        // 1-st, 3-rd and last is not moved
        expect(mv.toString()).toBe([false, true, false, true, true, false, false].toString());

        var arr_1 = [1, 2, 3, 4, 5, 6];
        var arr_2 = [1, 2, 4, 7, 6];
        var mv = ArrayUtils.detectMove(arr_1, arr_2); // just move and add and delete case
        // new items is not moved, it cut of new and deleted item and compare arr
        // arr_1 = [1, 2, 4, 6]
        // arr_1 = [1, 2, 4, 6]
        // arr is equals:)
        expect(mv.toString()).toBe([false, false, false, false, false].toString());
    });

    it('should detect move with custom eqFn', function () {
        function eqFn(a, b) // compare abs of items
        {
            return Math.abs(a) === Math.abs(b);
        }
        var arr_1 = [1, 2, -3, 4, -5];
        var arr_2 = [1, 5, -4, 3, -2];
        var mv = ArrayUtils.detectMove(arr_1, arr_2, eqFn); // just move case
        expect(mv.toString()).toBe([false, true, true, true, true].toString());

        var arr_1 = [1, 2, -3, 4, -5, 6];
        var arr_2 = [1, 5, -2, 6];
        var mv = ArrayUtils.detectMove(arr_1, arr_2, eqFn); // just move and delete case
        // it cut off deleted items and compare arr
        // it use custom eqFn to compare items
        // arr_1 = [1, 2, -5, 6]
        // arr_2 = [1, 5, -2, 6]
        // first and last is not moved;
        expect(mv.toString()).toBe([false, true, true, false].toString());

        var arr_1 = [1, 2, -3, 4, -5, 6];
        var arr_2 = [1, 5, -3, 2, -4, 7, 6];
        var mv = ArrayUtils.detectMove(arr_1, arr_2, eqFn); // just move and add case
        // new items is not moved, it cat of new item and compare arr
        // it use custom eqFn to compare items
        // arr_1 = [1, 2, -3, 4, -5, 6]
        // arr_1 = [1, 5, -3, 2, -4, 6]
        // 1-st, 3-rd and last is not moved
        expect(mv.toString()).toBe([false, true, false, true, true, false, false].toString());

        var arr_1 = [1, 2, -3, -4, -5, 6];
        var arr_2 = [1, 2, -4, -7, -6];
        var mv = ArrayUtils.detectMove(arr_1, arr_2, eqFn); // just move and add and delete case
        // new items is not moved, it cut of new and deleted item and compare arr
        // it use custom eqFn to compare items
        // arr_1 = [1, 2, -4, 6]
        // arr_1 = [1, 2, -4, -6]
        // arr is equals:)
        expect(mv.toString()).toBe([false, false, false, false, false].toString());

        var arr_1 = [1, 2, -3, -4, -5, 6];
        var arr_2 = [1, 2, -4, -7, -6];
        // if we don't use custom eqFn result would be differens
        var mv = ArrayUtils.detectMove(arr_1, arr_2); // just move and add and delete case
        // new items is not moved, it cut of new and deleted item and compare arr
        // arr_1 = [1, 2, -4] deleted: [-3, -5, 6]
        // arr_1 = [1, 2, -4] new: [-7, -6]
        // arr is equals:)
        expect(mv.toString()).toBe([false, false, false, false, false].toString());
    });
});
