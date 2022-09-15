const JSIntro = require("../../src/001_javascript_101/JSIntro");

describe("JSIntro-Sum", function () {

    it("sum of 2 and 3 is 5", function () {

        const i = JSIntro.Sum(2, 3);
        expect(i).toEqual(5);
    });

    it("sum of -1 and 3 is 2", function () {

        const i = JSIntro.Sum(-1, 3);
        expect(i).toEqual(2);
    });

});

