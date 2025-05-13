const express = require("express");
const teacherRouter = express.Router();

//controller imports
const {createStudent, getAllStudents} = require("../controller/studentController");
const {getStudentCertificateByTeacher} = require("../controller/certificateController");

const {verifyToken} = require("../middleware/verifyToken");

//middleware
teacherRouter.use(verifyToken);

teacherRouter.post("/createStudent", createStudent);
teacherRouter.get("/getAllStudents", getAllStudents);
teacherRouter.get("/getStudentCertificate", getStudentCertificateByTeacher);


// teacherRouter.get("/teacherCertificate") //to get all certificate of students under this teacher

module.exports = {teacherRouter};