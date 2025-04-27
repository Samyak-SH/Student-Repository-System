const mongoose = require("mongoose")

const studentSchema = mongoose.Schema({
    USN: { type: String, required: true , unique:true},
    TID : {type:String, required:true},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true , unique : true},
    password: { type: String, required: true }
})

const studentModel = mongoose.model("SCR", studentSchema, "students");

const getStudent = async (usn, cb)=>{
    try{
        const {USN, TID, firstName, lastName, email} = await studentModel.findOne( { USN : usn } );
        const student = {
            USN : USN,
            TID : TID,
            firstName : firstName,
            lastName : lastName,
            email : email,
        }
        cb(student, null);
    }catch(err){
        cb(null, err);
    }
}

const createStudent = async (student, cb)=>{
    try{
        console.log("student : ", student);
        await studentModel.insertOne(student);
        cb({message : "Success", error : null});
    }catch(err){
        cb({message : "Failed to create student", error : err});
    }
}

module.exports = {getStudent, createStudent}