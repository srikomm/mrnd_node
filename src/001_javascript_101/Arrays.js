/*
OVERVIEW: 	Implement a function that sums all the numbers in the given array.
			Example: SumOfArray([1,2,3]) should return a value of 6.

INPUTS: 	arrayOfNums: An array of numbers

OUTPUT: 	Sum of all the numbers

ERROR CASES: If arrayOfNums is null, return NaN.
			 If arrayOfNums is not an array, return NaN. Since Javascript is weakly typed, it is possible to
			 invoke calls such SumOfArray("hello").
			 You can use instanceof operator as described in the project page to check this.
*/
exports.SumOfArray = function (arrayOfNums) {
    if (arrayOfNums instanceof Array) {
        let result = 0;
        arrayOfNums.forEach(i => {
            result += i;
        });
        return result;
    }
    return NaN;
}

/*
OVERVIEW: 	Implement a function that sums only the unique numbers in the given array.
			Example: SumOfUniqueNumbers([2,3,3,2]) should return a value of 2+3=5.

INPUTS: 	arrayOfNums: An array of numbers

OUTPUT: 	Sum of the unique numbers

ERROR CASES: If arrayOfNums is null, return NaN.
			 If arrayOfNums is not an array, return NaN. Since Javascript is weakly typed, it is possible to
			 invoke calls such SumOfArray("hello").
			 You can use instanceof operator as described in the project page to check this.
*/

exports.SumOfUniqueNumbers = function (arrayOfNums) {
    if (arrayOfNums instanceof Array) {
        let arrayOfNumsSet = new Set(arrayOfNums);
        let result = 0;
        arrayOfNumsSet.forEach(i => {
            result += i;
        });
        return result;
    }
    return NaN;
}


function isArrayValid2dSquareArray(array) {
    if (array instanceof Array) {
        let len = array[0].length;
        array.forEach(subArray => {
            if (subArray instanceof Array) {
                if (subArray.length !== len) {
                    return false;
                }
            } else {
                return false;
            }
        });
        return true;
    }
    return false;
}

/*
OVERVIEW: 	Implement a function that sums the diagonal elements in the given array.
			Example: SumOfUniqueNumbers([[11,12,13],[12,13,14],[13,14,15]]) should sum the elements at indexes (1,1),(2,2),(3,3).
			This will be sum of 11 + 13 + 15 = 39

INPUTS: 	array2d: An array of numbers

OUTPUT: 	Sum of the diagonal cells of the array.

ERROR CASES: If array2d is null, return NaN.
			 If array2d is not an array, return NaN. 
			 If array2d is not a 2-d array, return NaN.
			 If array2d is a 2-d array with different dimensions, return NaN.
*/

exports.SumOfDiagonalCells = function (array2d) {
    if (isArrayValid2dSquareArray(array2d)) {
        let len = array2d.length;
        let result = 0;
        for (let i = 0; i < len; i++) {
            result += array2d[i][i];
        }
        return result;
    }
    return NaN;
}
