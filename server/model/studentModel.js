const mongoose = require("mongoose")
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

const studentSchema = mongoose.Schema({
    USN: { type: String, required: true , unique:true},
    TID : {type:String, required:true},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true , unique : true},
    password: { type: String, required: true },
    department : {type: String, required : true}
})

const studentModel = mongoose.model("students", studentSchema);

const getStudent = async (incoming_email, incoming_pass, cb) => {
    try {
        const result = await studentModel.findOne({ email: incoming_email });
        if (result) {
            const { USN, TID, firstName, lastName, email, password, department } = result;

            if (password !== incoming_pass) {
                return cb(null, { message: "wrong password" });
            }

            const payload = { USN,  TID, firstName, lastName, email, department };
            const token = jwt.sign(payload, SECRET_KEY);

            return cb(null, { message: "success", token });
        } else {
            return cb(null, { message: "user not found" });
        }

    } catch (err) {
        return cb(err, null);
    }
};


const createStudent = async (student, cb)=>{
    try{
        console.log("student : ", student);
        await studentModel.insertOne(student);
        cb({message : "Success", error : null});
    }catch(err){
        cb({message : "Failed to create student", error : err});
    }
}

const updateStudent = async (student, cb)=>{
    try{
        const result = await studentModel.updateOne({USN : student.USN},{$set:{
            firstName : student.firstName,
            lastName : student.lastName,
            email : student.email,
            password : student.password,

        }})

        if(result.modifiedCount == 0){
            cb({message : "no student found", error:{message: "modified count 0"}})
        }
        else{
            cb({message : "udpated successfully"});            
        }
    }
    catch(err){
        cb({message : "failed to update student", error : err.message});
    }
}

const getAllStudents = async (TID, cb)=>{
    try{
        const result = await studentModel.find({TID : TID});
        console.log("search results", result);
        cb(result, null);
    }
    catch(err){
        console.error(err);
        cb(null, err);
    }
}

module.exports = {getStudent, createStudent, updateStudent, getAllStudents}