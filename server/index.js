//library imports
require("dotenv").config({path:"./.env"});
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");



//router imports
const {studentRouter} = require("./router/studentRouter");

//env imports
const PORT = process.env.PORT;
const MONGODBURL = process.env.MONGODBURL;

//other consts expressions
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use("/student", studentRouter);

//todo
// app.get("/singin")
// app.get("/signup")
// app.get("/teacher") //to find teacher
// app.get("/studentCertificate") to get all student certificates
// app.get("/teacherCertificate")

// app.post("/uploadCertificate") //only student side
// app.post("/editCertificate") //only student side

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



