const JSIntro = require("../../src/Serialization");

describe("JSIntro-ParseNumber", function () {

    it("should return nothing for null", function () {

        const number = JSIntro.ParseNumber(null);
        expect(isNaN(number)).toEqual(true);
    });

    it("should return nothing for non-number string", function () {

        const number = JSIntro.ParseNumber("number");
        expect(isNaN(number)).toEqual(true);
    });

    it("should return -123", function () {

        const number = JSIntro.ParseNumber("-123");
        expect(number).toEqual(-123);
    });
});

describe("JSIntro-ConvertNumberToString", function () {

    it("should return 5.6", function () {

        const str = JSIntro.ConvertNumberToString(5.6);
        expect(str).toEqual("5.6");
    });

    it("should return -123", function () {

        const str = JSIntro.ConvertNumberToString(-123);
        expect(str).toEqual("-123");
    });

    it("should return nothing", function () {

        const str = JSIntro.ConvertNumberToString("1/1/2001");
        expect(str).toEqual("");
    });
});

describe("JSIntro-ParseDate", function () {

    it("should return nothing", function () {

        const dateValue = JSIntro.ParseDate(null);
        expect(dateValue == null).toEqual(true);
    });

    it("should return a Date instance", function () {

        const dateValue = JSIntro.ParseDate("June 1 2015");
        expect(dateValue.getFullYear()).toEqual(2015);
    });
});

describe("JSIntro-ConvertDateToString", function () {

    it("should return July 1st", function () {

        const str = JSIntro.ConvertDateToString(new Date(2015, 6, 1));
        expect(str).toContain("Wed Jul 01 2015");
    });

});

describe("JSIntro-ParseStringOfNumbers", function () {

    it("should return empty array", function () {

        const arr = JSIntro.ParseStringOfNumbers("");
        expect(arr.length).toEqual(0);
    });

    it("should return empty array", function () {

        const arr = JSIntro.ParseStringOfNumbers(100);
        expect(arr.length).toEqual(0);
    });

    it("should return [100]", function () {

        const arr = JSIntro.ParseStringOfNumbers("100");
        expect(arr.length).toEqual(1);
        expect(arr[0]).toEqual(100);
    });

    it("should return [1,5.0,-100]", function () {

        const arr = JSIntro.ParseStringOfNumbers("1,5.0,-100");
        expect(arr.length).toEqual(3);
        expect(arr[0]).toEqual(1);
        expect(arr[1]).toEqual(5.0);
        expect(arr[2]).toEqual(-100);
    });

    it("should return [1,NaN,-100]", function () {

        const arr = JSIntro.ParseStringOfNumbers("1,abc,-100");
        expect(arr.length).toEqual(3);
        expect(arr[0]).toEqual(1);
        expect(isNaN(arr[1])).toEqual(true);
        expect(arr[2]).toEqual(-100);
    });
});

describe("JSIntro-ConvertArrayOfNumbersToString", function () {

    it("should return empty string", function () {

        const str = JSIntro.ConvertArrayOfNumbersToString([]);

        expect(str).toEqual("");
    });

    it("should return empty string", function () {

        const str = JSIntro.ConvertArrayOfNumbersToString("[1,5,100]");

        expect(str).toEqual("");
    });

    it("should return 1,5.0,-100", function () {

        const str = JSIntro.ConvertArrayOfNumbersToString([1, 5.2, -100]);

        expect(str).toEqual("1,5.2,-100");
    });


});

describe("JSIntro-ConvertStringToObject", function () {

    it("should return null", function () {

        const obj = JSIntro.ConvertStringToObject("");

        expect(obj).toEqual(null);
    });

    it("should return object", function () {

        const str = "{\"firstname\":\"Bill\",\"lastname\":\"Gates\"}";

        const obj = JSIntro.ConvertStringToObject(str);

        expect(obj.firstname).toEqual("Bill");
        expect(obj.lastname).toEqual("Gates");
    });

    it("should return object", function () {

        const str = '{ "friends" : [' +
            '{ "firstname":"Bill" , "lastname":"Gates" },' +
            '{ "firstname":"Steve" , "lastname":"Jobs" },' +
            '{ "firstname":"Larry" , "lastname":"Ellison" }]}';

        const arr = JSIntro.ConvertStringToObject(str);

        //console.log(arr);

        expect(arr.friends.length).toEqual(3);
        expect(arr.friends[0].firstname).toEqual("Bill");
        expect(arr.friends[1].firstname).toEqual("Steve");
        expect(arr.friends[2].lastname).toEqual("Ellison");
    });
    it("should handle incorrectly formatted strings", function () {

        const str = "{firstname:\"Bill\",lastname:\"Gates\"}";

        const obj = JSIntro.ConvertStringToObject(str);

        expect(obj).toEqual(null);
    });

});

describe("JSIntro-ConvertObjectToString", function () {

    it("should return null", function () {

        const obj = JSIntro.ConvertStringToObject("");

        expect(obj).toEqual(null);
    });

    it("should return string", function () {

        const obj = {};
        obj.firstname = "Bill";
        obj.lastname = "Gates";

        const str = JSIntro.ConvertObjectToString(obj);

        expect(str).toEqual('{"firstname":"Bill","lastname":"Gates"}');
    });

    it("should return string for array", function () {

        const arr = [{"firstname": "Bill", "lastname": "Gates"},
            {"firstname": "Steve", "lastname": "Jobs"},
            {"firstname": "Larry", "lastname": "Ellison"}
        ];

        let str = JSIntro.ConvertObjectToString(arr);
        expect(str).toEqual('[{"firstname":"Bill","lastname":"Gates"},{"firstname":"Steve","lastname":"Jobs"},{"firstname":"Larry","lastname":"Ellison"}]');

    });
});

