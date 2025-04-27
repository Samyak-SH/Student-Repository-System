const express = require("express");
const studentRouter = express.Router();

//controller imports
const {getStudent} = require("../controller.js/studentController")

const {verifyToken} = require("../middleware/verifyToken");

studentRouter.use(verifyToken);

studentRouter.get("/getStudent", getStudent);

// teacherRouter.get("/studentCertificate") to get all student certificates

module.exports = {studentRouter};