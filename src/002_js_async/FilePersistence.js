/**
 ------------ ERROR CODES ------------
 1001 - Invalid inputs
 1002 - Invalid filters
 1003 - Mandatory values not sent.
 1004 - Record already exists..
 */

/**
 We assume the files that are used as data source for this activity reside in the file "files/students.txt"
 */
const Student = function (id, firstName, lastName, gender, totalMarks) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.totalMarks = totalMarks;
};

function get_filter(key) {
    switch (key) {
        case 'id':
            return 0;
        case 'firstName':
            return 1;
        case 'lastName':
            return 2;
        case 'gender':
            return 3;
        case 'totalMarks':
            return 4;
    }
}

/**
 Method used to read students data from the file.

 If no filters are given, return list of all the students details.

 Else, apply all the given filters.

 ------------------
 Schema of a filter..
 ------------------

 filters contains list of filters that have to be applied on the students' data.

 Each filter contains the following properties..

 "key", "value", "optype".

 ** key and value are mandatory properties.
 Throw error in case they are missing. (Refer error codes at Page Top!)

 Default value for optype = "EQ".

 List of valid optype -> EQ, NE, GT, LT, GTE, LTE
 (Equals, NotEquals, GreaterThan, LessThan, GreaterThanEquals, LessThanEquals)

 Example filter ---
 [{
    "key" : "gender",
    "value": "male"
},{
    "key" : "totalMarks",
    "value": 90,
    "optype": "GTE"
}]
 Return all the male students having marks greater than or equal to 90!!
 */
exports.getStudents = function (filters, callback) {
    const fs = require("fs");
    const path = require('path');
    const fileName = path.join(__dirname, '..', '..', 'files') + "/students.txt";
    fs.readFile(fileName, 'utf-8', function (err, data) {
        let i;
        data = data.toString().split('\n');
        for (i = 0; i < data.length; i++) {
            data[i] = data[i].split(' ');
        }
        data = data.filter(function (stu) {
            return stu[0].length > 0;
        });
        const result = [];
        let stu;
        if (filters == null) {
            for (i = 0; i < data.length; i++) {
                stu = new Student(parseInt(data[i][0]), data[i][1], data[i][2], data[i][3], parseInt(data[i][4]));
                result.push(stu);
            }
            return callback(null, result);
        }
        for (i = 0; i < data.length; i++) {
            let flag = 0;
            for (let j = 0; j < filters.length; j++) {
                const k = get_filter(filters[j].key);
                switch (filters[j].optype) {
                    case 'EQ':
                        flag = (data[i][k] === filters[j].value);
                        break;
                    case 'NE':
                        flag = (data[i][k] !== filters[j].value);
                        break;
                    case 'LT':
                        flag = (data[i][k] < filters[j].value);
                        break;
                    case 'GT':
                        flag = (data[i][k] > filters[j].value);
                        break;
                    case 'GTE':
                        flag = (data[i][k] >= filters[j].value);
                        break;
                    case 'LTE':
                        flag = (data[i][k] <= filters[j].value);
                        break;
                    default:
                        flag = (data[i][k] === filters[j].value);
                        break;
                }
            }
            if (flag) {
                stu = new Student(parseInt(data[i][0]), data[i][1], data[i][2], data[i][3], parseInt(data[i][4]));
                result.push(stu);
            }
        }
        return callback(null, result);
    });
};

/**
 Method is to create a new student in the data source (i.e, a file.)

 student contains the required student's data.

 mandatory fields are id, lastName, firstName, gender and totalMarks.

 --valid values for gender are "male" and "female".

 --valid values for totalMarks is range 0 - 100.

 Throw appropriate errors for invalid values. (Refer error codes from the page top)
 */
exports.createStudent = function (student, callback) {
    let err = {};
    if (!(student.hasOwnProperty('id')) || !(student.hasOwnProperty('firstName')) || !(student.hasOwnProperty('lastName')) || !(student.hasOwnProperty('gender')) || !(student.hasOwnProperty('totalMarks'))) {
        err.code = 1003;
        err.message = 'Mandatory Values not sent';
        return callback(err);
    }
    if ((student.gender !== 'male' && student.gender !== 'female') || student.totalMarks < 0 || student.totalMarks > 100) {
        err.code = 1001;
        err.message = 'Invalid filters';
        return callback(err);
    }
    const fs = require("fs");
    const path = require('path');
    const fileName = path.join(__dirname, '..', '..', 'files') + "/students.txt";
    let data = fs.readFileSync(fileName, 'utf8');
    data = data.toString().split('\n');
    for (let i = 0; i < data.length; i++) {
        data[i] = data[i].split(' ');
        if (data[i][0] === student.id.toString()) {
            err = {};
            err.code = 1004;
            err.message = 'Record already exists';
            return callback(err, null);
        }
    }
    const res = student.id.toString() + ' ' + student.firstName.toString() + ' ' + student.lastName.toString() + ' ' + student.gender.toString() + ' ' + student.totalMarks.toString() + '\n';
    fs.appendFileSync(fileName, res, 'utf-8');
    return callback(null);
};