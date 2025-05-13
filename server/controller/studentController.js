const studentModel = require("../model/studentModel");

const getStudent = (req, res) => {
    console.log("hit");
    const { email, password } = req.body;
    studentModel.getStudent(email, password, (err, result) => {
        if (err) {
            console.error("Error while fetching student", err);
            return res.status(500).send({ message: "Server error", error: err.message });
        }

        if (result.message === "wrong password") {
            return res.status(401).send({ message: "Unauthorized: wrong password" });
        }

        if (result.message === "user not found") {
            return res.status(404).send({ message: "User not found" });
        }
        return res.status(200).header("x-auth-token", result.token).send({ message: "success" });
    })
}

const createStudent = (req,res)=>{
    //todo hash password
    const student = {
        USN : req.body.usn,
        TID : req.user.TID,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : req.body.password,
        department : req.body.department
    }
    studentModel.createStudent(student, (result)=>{
        if(result.error){
            console.error(result.message, result.error.message);
            return res.status(500).send({message : result.message, error:result.error.message});
        }
        res.status(200).send({message : result.message});
    })
}

const getAllStudents = (req,res)=>{
    const {TID} = req.user;
    console.log("getting student with tid", TID);
    
    studentModel.getAllStudents(TID, (result, err)=>{
        if(err){
            return res.status(500).send({message : "failed to get students"});
        }
        if(result.length==0){
            return res.status(404).send({message : "no students found"});
        }
        return res.status(200).send(result);
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

module.exports = {getStudent, createStudent, updateStudent, getAllStudents}