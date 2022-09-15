describe("Tutorial Test Suite", function () {
    const tutorial = require("../../src/001_javascript_101/Tutorial");

    it("should run tutorials", function () {
        tutorial.Variables();
        tutorial.WeakTyping();
        tutorial.DataTypes();
        tutorial.Arrays();
        tutorial.Objects();
        tutorial.InstanceOf();
        tutorial.Serialization();

    });

});

