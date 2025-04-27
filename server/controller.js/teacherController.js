const teacherModel = require("../model/teacherModel");

const getTeacher = (req,res)=>{
    //actual code const {TID} = req.user because we storing decoded details in req.user after jwt verfication/
    const {TID} = req.body; // fetching from request body for testing 
    console.log("TID : ",TID);
    teacherModel.getTeacher(TID, (result, err)=>{
        if(err){
            console.error("Failed to fetch teacher\n", err);
            return res.status(500).send({message:"Failed to fetch teacher", error: err.message})
        }
        if(!result){
            return res.status(404).send({message : "teacher not found"});
        }
        res.status(200).send(result);
    })
}

const createTeacher = (req,res)=>{
    //todo hash password
    const teacher = {
        TID : req.body.TID,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : req.body.password
    }
    //todo create JWT and return to user
    teacherModel.createTeacher(teacher, (message, err)=>{
        if(err){
            console.error(message, err.message);
            return res.status(500).send({message : message, error:err.message});
        }
        res.status(200).send({message : message});
    })
}

module.exports = {getTeacher, createTeacher}