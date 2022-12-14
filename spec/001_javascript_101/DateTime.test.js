const JSIntro = require("../../src/001_javascript_101/DateTime");

describe("JSIntro-GetDay", function () {

    it("should return nothing", function () {

        const day = JSIntro.GetDay(null);
        expect(isNaN(day)).toEqual(true);
    });

    it("should return nothing", function () {

        const day = JSIntro.GetDay("");
        expect(isNaN(day)).toEqual(true);
    });

    it("should return nothing", function () {

        const day = JSIntro.GetDay("invalid dateString");
        expect(isNaN(day)).toEqual(true);
    });

    it("should return 1", function () {

        const day = JSIntro.GetDay("June 1, 2015");
        expect(day).toEqual(1); // June 1, 2015, is a monday.
    });

    it("should return null", function () {

        const day = JSIntro.GetDay("June 112, 2015");
        expect(isNaN(day)).toEqual(true); // Incorrect date.
    });
});

