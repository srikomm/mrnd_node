const JSIntro = require("../../src/Objects");

describe("JSIntro-GetObjectPropertyNames", function () {


    it("should return nothing", function () {

        const propertyNames = JSIntro.GetObjectPropertyNames(null);
        expect(propertyNames).toEqual(null);

    });

    it("should return property names", function () {

        const Contact = function () {
            this.firstName = "Bill";
            this.lastName = "Gates";
        }

        const College = function () {
            this.Name = "Harvard University";
            this.Address = "Cambridge, MA 02138, United States";
        }

        let propertyNames = JSIntro.GetObjectPropertyNames(new Contact());
        expect(propertyNames.length).toEqual(2);
        expect(propertyNames[0]).toEqual("firstName");
        expect(propertyNames[1]).toEqual("lastName");

        propertyNames = JSIntro.GetObjectPropertyNames(new College());
        expect(propertyNames.length).toEqual(2);
        expect(propertyNames[0]).toEqual("Name");
        expect(propertyNames[1]).toEqual("Address");
    });
});

describe("JSIntro-GetObjectPropertyValues", function () {

    it("should return nothing", function () {

        const propertyValues = JSIntro.GetObjectPropertyValues(null);
        expect(propertyValues).toEqual(null);

    });

    it("should return property values", function () {

        const Contact = function () {
            this.firstName = "Bill";
            this.lastName = "Gates";
        }

        const College = function () {
            this.Name = "Harvard University";
            this.Address = "Cambridge, MA 02138, United States";
        }

        let propertyValues = JSIntro.GetObjectPropertyValues(new Contact());
        //console.log(propertyValues);
        expect(propertyValues.length).toEqual(2);
        expect(propertyValues[0]).toEqual((new Contact()).firstName);
        expect(propertyValues[1]).toEqual((new Contact()).lastName);

        propertyValues = JSIntro.GetObjectPropertyValues(new College());
        // console.log(propertyValues);
        expect(propertyValues.length).toEqual(2);
        expect(propertyValues[0]).toEqual((new College()).Name);
        expect(propertyValues[1]).toEqual((new College()).Address);
    });
});

