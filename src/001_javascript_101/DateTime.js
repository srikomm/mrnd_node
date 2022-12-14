/*
OVERVIEW: 	Given a date in string format, return the day it corresponds to.
			Example: GetDay("Jan 12, 2000") should return 12.

INPUTS: 	dateString: String representing a date.

OUTPUT: 	number representing the day part of the date.

ERROR CASES: Return NaN if dateString is null or is not a valid Date.

NOTES: 		You can use built-in JS Classes such as Date class.

*/

function isInputValidDateString(input) {
    if (typeof input === 'string') {
        return !isNaN(Date.parse(input));
    }
    return false;
}

exports.GetDay = function(dateString){
    if(isInputValidDateString(dateString)) {
        let inputDate = Date.parse(dateString);
        let inputUtc = new Date(inputDate);
        return inputUtc.getDate();
    }
    return NaN;
}

