//library imports
require("dotenv").config({path:"./.env"});
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//controller imports
const {createStudent} = require("./controller/studentController")
const {createTeacher, getTeacher} = require("./controller/teacherController")

//router imports
const {studentRouter} = require("./router/studentRouter");
const {teacherRouter} = require("./router/teacherRouter")

//env imports
const PORT = process.env.PORT;
const MONGODBURL = process.env.MONGODBURL;

//other consts expressions
const app = express();

//middleware
app.use(cors({
  exposedHeaders: ['x-auth-token'], 
}));
app.use(express.json({limit : '10mb'}));
app.use(express.urlencoded({extended : true, limit : '10mb'}));

//routings
app.use("/student", studentRouter);
app.use("/teacher", teacherRouter);

app.get("/test", (req,res)=>{res.send("server running")});

//todo
app.post("/teacher/login", getTeacher)
// app.get("/singin")
// app.get("/signup")

// app.post("/editCertificate") //only student side
app.post("/createStudent", createStudent) //does not require jwt verification
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



