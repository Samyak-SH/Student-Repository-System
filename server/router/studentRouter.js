const express = require("express");
const studentRouter = express.Router();

//contr0ller imports
const {getStudent} = require("../controller.js/studentController")

const {verifyToken} = require("../middleware/verifyToken");

studentRouter.use(verifyToken);

studentRouter.get("/getStudent", getStudent);

module.exports = {studentRouter};