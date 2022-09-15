/*
OVERVIEW: 	Javascript objects are essentially containers for named values. In this activity, you will write
			a function that inspects an object and returns its property names.
			Example: var car = {make: "Honda", model:"Civic", color:"Silver"}
			GetObjectPropertyNames() should return ["make","model","color"] 

INPUTS: 	obj - A javascript object

OUTPUT: 	array containing the property names of obj.

ERROR CASES: return null if obj is null or is not a Javascript object.
*/
exports.GetObjectPropertyNames = function (obj) {
    if (obj instanceof Object) {
        let result = []
        for (let prop in obj) {
            result.push(prop);
        }
        // Another way of iterating through the properties of the object.
        // Object.keys(obj).forEach(key => {
        //     result.push(key);
        // });
        return result;
    }
    return null;
}

/*
OVERVIEW: 	Javascript objects are essentially containers for named values. In this activity, you will write
			a function that inspects an object and returns its property values.
			Example: var car = {make: "Honda", model:"Civic", color:"Silver"}
			GetObjectPropertyValues() should return ["Honda","Civic","Silver"] 

INPUTS: 	obj - A javascript object

OUTPUT: 	array containing the property names of obj.

ERROR CASES: return null if obj is null or is not a Javascript object.
*/
exports.GetObjectPropertyValues = function (obj) {
    if (obj instanceof Object) {
        let result = [];
        for (let prop in obj) {
            result.push(obj[prop]);
        }
        return result;
    }
    return null;
}

