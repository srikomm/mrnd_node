const fs = require('fs');

const Arrays = require("../../src/002_js_async/Arrays.js");

function getFilePath() {

    const path = require('path');
    return path.join(__dirname, '..', '..', 'files');
}

function writeInputToTheFile(inputNumbers, fileName, is2DArray, callback) {
    let stringToWrite;

    if (is2DArray) {
        stringToWrite = stringify2DArray(inputNumbers);
    } else {
        stringToWrite = stringifyArray(inputNumbers);
    }

    fs.writeFile(fileName, stringToWrite, function (err) {
        if (err) {
            console.log("Error in writing the input ", err);
            callback(err);
        }
        console.log("Input Entered!!");
        callback(null);
    });
}

function stringify2DArray(arrays) {
    let string = "";

    for (let i = 0; i < arrays.length; i++) {
        string += stringifyArray(arrays[i]);
    }
    return string;
}

function stringifyArray(array) {
    let string = "";

    for (let i = 0; i < array.length; i++) {
        string += array[i];
        string += " ";
    }
    string += "\n";
    return string;
}

describe("arrays Async Test Suite ", function () {

    it("Should find max element in single array ", function (done) {

        const arr = [1, 5, 2, 9, 3];
        const expectedMax = 9;

        const self = this;

        const arrays = new Arrays();

        try {
            arrays.findMax(arr, function (err, maxEle) {
                try {
                    expect(err).toBe(null);
                    expect(maxEle).toBe(expectedMax);
                } catch (e) {
                    console.log(e);
                    self.fail(Error("test failed due to " + JSON.stringify(e)));
                }
                done();
            });
        } catch (e) {
            console.log(e);
            self.fail(Error("test failed due to " + JSON.stringify(e)));
            done();
        }
    });

    it("Should find max in empty array ", function (done) {
        const arr = [];
        const self = this;
        const expectedMax = null;
        const arrays = new Arrays();

        try {
            arrays.findMax(arr, function (err, maxEle) {
                try {
                    expect(err).toBe(null);
                    expect(maxEle).toBe(expectedMax);
                } catch (e) {
                    self.fail(Error("test failed due to " + JSON.stringify(e)));
                }
                done();
            });
        } catch (e) {
            self.fail(Error("test failed due to " + JSON.stringify(e)));
            done();
        }
    });

    it("Should find max in all the arrays", function (done) {
        const inputarrays = [[1, 5, 2, 9, 3], [2, 6, 1, 5], [4, 9, 10]];

        const expectedMaxValues = [9, 6, 10];

        const fileName = getFilePath() + "/arrays.txt";

        //
        const arrays = new Arrays();
        spyOn(arrays, "findMax").andCallThrough();

        const self = this;
        writeInputToTheFile(inputarrays, fileName, true, function (err) {
            if (!err) {
                try {
                    arrays.getMaxArray(function (err, maxElementsArray) {
                        try {
                            expect(err).toBe(null);
                            expect(maxElementsArray.length).toBe(expectedMaxValues.length);
                            expect(arrays.findMax).toHaveBeenCalled();

                            for (let i = 0; i < expectedMaxValues.length; i++) {
                                expect(maxElementsArray[i]).toBe(expectedMaxValues[i]);
                            }
                        } catch (e) {
                            self.fail(Error("test failed due to " + JSON.stringify(e)));
                        }
                        done();
                    });
                } catch (e) {
                    console.log(e);
                    self.fail(Error("test failed due to " + JSON.stringify(e)));
                    done();
                }
            } else {
                self.fail(Error("Could not write input to the file " + JSON.stringify(err)));
                done();
            }
        });
    });

    it("Should find max element of arrays having only single array ", function (done) {
        const inputarrays = [[1, 5, 2, 9, 3]];

        const expectedMaxValues = [9];

        const fileName = getFilePath() + "/arrays.txt";

        const arrays = new Arrays();
        spyOn(arrays, "findMax").andCallThrough();

        const self = this;
        writeInputToTheFile(inputarrays, fileName, true, function (err) {
            if (!err) {
                try {
                    arrays.getMaxArray(function (err, maxElementsArray) {
                        try {
                            expect(err).toBe(null);
                            expect(maxElementsArray.length).toBe(expectedMaxValues.length);
                            expect(arrays.findMax).toHaveBeenCalled();

                            for (let i = 0; i < expectedMaxValues.length; i++) {
                                expect(maxElementsArray[i]).toBe(expectedMaxValues[i]);
                            }
                        } catch (e) {
                            self.fail(Error("test failed due to " + JSON.stringify(e)));
                        }
                        done();
                    });
                } catch (e) {
                    self.fail(Error("test failed due to " + JSON.stringify(e)));
                    done();
                }
            } else {
                self.fail(Error("Could not write input to the file " + JSON.stringify(err)));
                done();
            }
        });
    });

    it("Should find max element in all the arrays having empty arrays as well  ", function (done) {
        const inputarrays = [[1, 5, 2, 9, 3], [], [4, 9, 10]];

        const expectedMaxValues = [9, null, 10];

        const fileName = getFilePath() + "/arrays.txt";

        const arrays = new Arrays();

        spyOn(arrays, "findMax").andCallThrough();

        const self = this;
        writeInputToTheFile(inputarrays, fileName, true, function (err) {
            if (!err) {
                try {
                    arrays.getMaxArray(function (err, maxElementsArray) {
                        try {
                            expect(err).toBe(null);
                            expect(maxElementsArray.length).toBe(expectedMaxValues.length);
                            expect(arrays.findMax).toHaveBeenCalled();

                            for (let i = 0; i < expectedMaxValues.length; i++) {
                                expect(maxElementsArray[i]).toBe(expectedMaxValues[i]);
                            }
                        } catch (e) {
                            self.fail(Error("test failed due to " + JSON.stringify(e)));
                        }
                        done();
                    });
                } catch (e) {
                    self.fail(Error("test failed due to " + JSON.stringify(e)));
                    done();
                }
            } else {
                self.fail(Error("Could not write input to the file " + JSON.stringify(err)));
                done();
            }
        });
    });
});