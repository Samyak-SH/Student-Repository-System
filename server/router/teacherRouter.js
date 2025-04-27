const express = require("express");
const teacherRouter = express.Router();

//controller imports
const {getTeacher} = require("../controller.js/teacherController")


const {verifyToken} = require("../middleware/verifyToken");

teacherRouter.use(verifyToken);

teacherRouter.get("/getTeacher", getTeacher);

module.exports = {teacherRouter};