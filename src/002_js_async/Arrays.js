const Arrays = function () {

    /**
     Utility function used to find the maximum element in the given array.

     The array is given as input.

     Return the max element of array in the callback in error first way.
     */
    this.findMax = function (array, callback) {
        if (array instanceof Array) {

            if (array.length === 0) {
                return callback(null, null);
            }

            let max = array[0];
            array.forEach(i => {
                if (i > max) {
                    max = i;
                }
            });
            return callback(null, max);
        }
        let err = {};
        err.code = 100;
        err.message = "Please give proper input";
        return callback(err);
    };

    this.fetchArraysFromFile = function () {
        const path = require("path");
        const fs = require("fs");
        const fileName = path.join(__dirname, '..', '..', 'files') + '/arrays.txt';
        let result = [];
        let data = fs.readFileSync(fileName, 'utf8')
        let lines = data.split('\n').slice(0, -1);
        let lineArray = [];

        lines.forEach(line => {
            lineArray = [];
            line = line.split(' ').slice(0, -1);
            line.forEach(char => {
                lineArray.push(parseInt(char));
            });
            if (lineArray !== []){
                result.push(lineArray);
            }
        });
        return result;
    }


    /**
     Utility function used to find maximum element of given arrays

     Each line in the file "files/arrays.txt" corresponds to an Array.

     Use the above-mentioned function findMax to find max element in all the arrays.

     Test case fails if the findMax method is not used.

     Return list of max elements via the callback.

     Example input [[3, 6, 1], [5, 7, 8, 1], [5,8,3]] output [6, 8, 8]
     */
    this.getMaxArray = function (callback) {
        let arrays = this.fetchArraysFromFile(callback);
        let result = [];
        arrays.forEach(array => {
            this.findMax(array, function (er, res) {
                if (er) {
                    throw er;
                }
                result.push(res);
            });
        });
        return callback(null, result);
    };
};

module.exports = Arrays;