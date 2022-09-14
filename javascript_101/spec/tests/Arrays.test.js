const JSIntro = require("../../src/Arrays");

describe("JSIntro-SumOfArray", function () {

    it("sum of 2 and 3 is 5", function () {

        let i = JSIntro.SumOfArray([2, 3]);
        expect(i).toEqual(5);
    });

});
describe("JSIntro-SumOfUniqueNumbers", function () {

    it("sum of 2,3,3,2 is 5", function () {

        let i = JSIntro.SumOfUniqueNumbers([2, 3, 3, 2]);
        expect(i).toEqual(5);
    });

    it("sum of 2,3,4 is 9", function () {

        let i = JSIntro.SumOfUniqueNumbers([2, 3, 4]);
        expect(i).toEqual(9);
    });
    it("sum of 1,2,3,4,3,3 is 10", function () {

        let i = JSIntro.SumOfUniqueNumbers([1, 2, 3, 4, 3, 3]);
        expect(i).toEqual(10);
    });
});

describe("JSIntro-SumOfDiagonalCells", function () {

    it("should check for non-array", function () {

        let sum = JSIntro.SumOfDiagonalCells("5,6,7");

        expect(isNaN(sum)).toEqual(true);
    });

    it("should check for non-2d arrays", function () {

        let arr = [1, 2, 3];

        let sum = JSIntro.SumOfDiagonalCells(arr);

        expect(isNaN(sum)).toEqual(true);
    });

    it("should check for arrays with non-equal dimensions", function () {

        let arr = [[1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 6, 7]];

        let sum = JSIntro.SumOfDiagonalCells(arr);

        expect(isNaN(sum)).toEqual(true);
    });

    it("should return 9", function () {

        let arr = [[1, 2, 3], [2, 3, 4], [3, 4, 5]];

        let sum = JSIntro.SumOfDiagonalCells(arr);

        expect(sum).toEqual(9);
    });
});




