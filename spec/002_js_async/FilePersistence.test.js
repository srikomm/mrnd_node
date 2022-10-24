const fs = require('fs');
const FilePersistence = require("../../src/002_js_async/FilePersistence.js");

function getFilePath() {
    const path = require('path');
    return path.join(__dirname, '..', '..', 'files');
}

const Student = function (id, firstName, lastName, gender, totalMarks) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.totalMarks = totalMarks;
}


describe("FilePersistence Async Test Suite ", function () {

    it("Should create student ", function (done) {
        console.log("home " + process.env.HOME);
        try {
            console.log("Deleting the student's data.... ");
            const fileName = getFilePath() + "/students.txt";
            fs.truncateSync(fileName);
        } catch (e) {
            console.log("delete file exception -- ignore ", e);
        }
        const student = new Student(32, "FirstName", "LastName", "male", 60);
        try {
            FilePersistence.createStudent(student, function (err) {
                expect(err).toBe(null);
                done();
            });
        } catch (e) {
            console.log(e);
            throw new Error("Error caused with " + JSON.stringify(e));
        }
    });

    it("Should not create student with invalid gender", function (done) {
        const student = new Student(24, "FirstName", "LastName", "boy", 60);
        try {
            FilePersistence.createStudent(student, function (err) {
                expect(err).not.toBe(null);
                expect(err.code).toBe(1001);
                done();
            });
        } catch (e) {
            throw new Error("Error caused with " + JSON.stringify(e));
        }
    });

    it("Should not create student with existing id", function (done) {
        const student = new Student(32, "Sample", "Sample", "female", 60);
        try {
            FilePersistence.createStudent(student, function (err) {
                expect(err).not.toBe(null);
                expect(err.code).toBe(1004);
                done();
            });
        } catch (e) {
            throw new Error("Error caused with " + JSON.stringify(e));
        }
    });

    it("Should retrieve all students ", function (done) {
        try {
            FilePersistence.getStudents(null, function (err, students) {
                expect(err).toBe(null);
                expect(students.length).toBe(1);
                expect(students[0].firstName).toBe("FirstName");
                done();
            });
        } catch (e) {
            throw new Error("Error caused with " + JSON.stringify(e));
        }
    });

    it("Should retrieve students by filters ", function (done) {
        try {
            FilePersistence.getStudents([
                {
                    "key": "firstName",
                    "value": "FirstName"
                }
            ], function (err, students) {
                expect(err).toBe(null);
                expect(students.length).toBe(1);
                expect(students[0].firstName).toBe("FirstName");
                done();
            });
        } catch (e) {
            throw new Error("Error caused with " + JSON.stringify(e));
        }
    });

    it("Should create student 2 ", function (done) {
        try {
            const student = new Student(35, "Student", "Stud", "male", 70);
            FilePersistence.createStudent(student, function (err) {
                expect(err).toBe(null);
                done();
            });
        } catch (e) {
            throw new Error("Error caused with " + JSON.stringify(e));
        }
    });

    it("Should retrieve students having marks greater than 55 ", function (done) {
        try {
            FilePersistence.getStudents([
                {
                    "key": "totalMarks",
                    "value": 55,
                    "optype": "GTE"
                }
            ], function (err, students) {
                expect(err).toBe(null);
                expect(students.length).toBe(2);
                done();
            });
        } catch (e) {
            throw new Error("Error caused with " + JSON.stringify(e));
        }
    });

    it("Should create female student ", function (done) {
        try {
            const student = new Student(36, "Student1", "Stud1", "female", 70);
            FilePersistence.createStudent(student, function (err) {
                expect(err).toBe(null);
                done();
            });
        } catch (e) {
            throw new Error("Error caused with " + JSON.stringify(e));
        }
    });

    it("Should retrieve female students having marks greater than 55 ", function (done) {
        try {
            FilePersistence.getStudents([
                {
                    "key": "totalMarks",
                    "value": 55,
                    "optype": "GTE"
                }, {
                    "key": "gender",
                    "value": "female"
                }
            ], function (err, students) {
                expect(err).toBe(null);
                expect(students.length).toBe(1);
                done();
            });
        } catch (e) {
            throw new Error("Error caused with " + JSON.stringify(e));
        }
    });

    it("Should retrieve all the students ", function (done) {
        try {
            FilePersistence.getStudents(null, function (err, students) {
                expect(err).toBe(null);
                expect(students.length).toBe(3);
                done();
            });
        } catch (e) {
            throw new Error("Error caused with " + JSON.stringify(e));
        }
    });
});