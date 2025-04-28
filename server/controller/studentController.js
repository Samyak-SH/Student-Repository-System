const studentModel = require("../model/studentModel");

const getStudent = (req,res)=>{
    //actual code const {USN} = req.user because we storing decoded details in req.user after jwt verfication/
    const {USN} = req.body; // fetching from request body for testing 
    console.log("USN : ",USN);
    studentModel.getStudent(USN, (result)=>{
        if(result.error){
            console.error("Failed to fetch student\n", result.error.message);
            return res.status(500).send({message:"Failed to fetch student", error: result.error.message})
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
    studentModel.createStudent(student, (result)=>{
        if(result.error){
            console.error(result.message, result.error.message);
            return res.status(500).send({message : result.message, error:result.error.message});
        }
        res.status(200).send({message : result.message});
    })
}

const updateStudent = (req,res)=>{
    //actual code const const {newFirstName, newLastName, newEmail, newPassword} = req.user because we storing decoded details in req.user after jwt verfication/
    const {USN, newFirstName, newLastName, newEmail, newPassword} = req.body; // fetching from request body for testing 
    //updating USN not allowed hence no newUSN variable, but we send USN to the server to find userdata from DB
    const student = {
        USN : USN,
        firstName : newFirstName,
        lastName : newLastName,
        email : newEmail,
        password : newPassword,
    }
    studentModel.updateStudent(student, (result)=>{

        if(result.error){
            return res.status(500).send({message : result.message, error:result.error.message});
        }
        res.status(200).send({message : result.message});
    })
}

module.exports = {getStudent, createStudent, updateStudent}