const express = requires("express");
const studentRouter = express.Router();

//contr0ller imports
const {findStudent} = require("./controller.js/studentController")

const {verifyToken} = require("../middleware/verifyToken");

studentRouter.use(verifyToken);

studentRouter.get("/getStudent", findStudent)

module.exports = {studentRouter};