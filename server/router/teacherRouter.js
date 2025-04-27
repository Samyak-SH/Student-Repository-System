const express = require("express");
const teacherRouter = express.Router();

//controller imports
const {getTeacher} = require("../controller.js/teacherController")

const {verifyToken} = require("../middleware/verifyToken");

teacherRouter.use(verifyToken);

teacherRouter.get("/getTeacher", getTeacher);

// teacherRouter.get("/teacherCertificate") //to get all certificate of students under this teacher

module.exports = {teacherRouter};