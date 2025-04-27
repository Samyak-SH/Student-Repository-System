const studentModel = require("../model/studentModel");

const getStudent = (req,res)=>{
    //actual code const {usn} = req.user because we storing decoded details in req.user after jwt verfication/
    const {USN} = req.body; // fetching from request body for testing 
    console.log("USN : ",USN);
    studentModel.getStudent(USN, (result, err)=>{
        if(err){
            console.error("Failed to fetch student\n", err);
            return res.status(500).send({message:"Failed to fetch student", error: err.message})
        }
        if(!result){
            return res.status(404).send({message : "student not found"});
        }
        res.status(200).send(result);
    })
}

const createStudent = (req,res)=>{
    //todo hash password
    const student = {
        USN : req.body.USN,
        TID : req.body.TID,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : req.body.password
    }
    //todo create JWT and return to user
    studentModel.createStudent(student, (message, err)=>{
        if(err){
            console.error(message, err.message);
            return res.status(500).send({message : message, error:err.message});
        }
        res.status(200).send({message : message});
    })
}

module.exports = {getStudent, createStudent}