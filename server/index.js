//library imports
require("dotenv").config({path:"./.env"});
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//controller imports
const {createStudent, getStudent} = require("./controller/studentController")
const {createTeacher, getTeacher} = require("./controller/teacherController")

//router imports
const {studentRouter} = require("./router/studentRouter");
const {teacherRouter} = require("./router/teacherRouter")

//middleware imports
const {verifyTokenLogin} = require("./middleware/verifyToken");

//env imports
const PORT = process.env.PORT;
const MONGODBURL = process.env.MONGODBURL;

//other consts expressions
const app = express();

//middleware
app.use(cors({
  exposedHeaders: ['x-auth-token'], 
}));
app.use(express.json({limit : '50mb'}));
app.use(express.urlencoded({extended : true, limit : '50mb'}));

//routings
app.use("/student", studentRouter);
app.use("/teacher", teacherRouter);

app.get("/test", (req,res)=>{res.send("server running")});
app.post("/verify", verifyTokenLogin);

//todo
app.post("/teacherLogin", getTeacher)
app.post("/studentLogin", getStudent)


app.post("/createTeacher", createTeacher)

const startServer = async ()=>{
    try{
        await mongoose.connect(`${MONGODBURL}`);
        console.log("Database connected successfully");

        app.listen(PORT, ()=>{
            console.log(`server started on http://localhost:${PORT}`);
        })
    }catch(err){
        console.error("failed to start server\n", err);
    }
}

startServer();



