const express = require("express");
const studentRouter = express.Router();

//controller imports
const {getStudent, updateStudent} = require("../controller/studentController")
const {uploadCertificate, getStudentCertificate} = require("../controller/certificateController");

const {verifyToken} = require("../middleware/verifyToken");

//middleware
studentRouter.use(verifyToken);

studentRouter.get("/getStudent", getStudent);
studentRouter.get("/certificate", getStudentCertificate);
studentRouter.post("/updateStudent", updateStudent);
studentRouter.post("/uploadCertificate", uploadCertificate);

// teacherRouter.get("/studentCertificate") to get all student certificates

module.exports = {studentRouter};