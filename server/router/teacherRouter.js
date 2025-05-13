const express = require("express");
const teacherRouter = express.Router();

//controller imports
const {createStudent} = require("../controller/studentController");

const {verifyToken} = require("../middleware/verifyToken");

//middleware
teacherRouter.use(verifyToken);

teacherRouter.post("/createStudent", createStudent);


// teacherRouter.get("/teacherCertificate") //to get all certificate of students under this teacher

module.exports = {teacherRouter};