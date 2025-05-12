const mongoose = require("mongoose")

const studentSchema = mongoose.Schema({
    USN: { type: String, required: true , unique:true},
    TID : {type:String, required:true},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true , unique : true},
    password: { type: String, required: true }
})

const studentModel = mongoose.model("students", studentSchema);

const getStudent = async (usn, cb)=>{
    try{
        const result = await studentModel.findOne( { USN : usn } );
        if(result){
            const {USN, TID, firstName, lastName, email} = result;
            const student = {
                USN : USN,
                TID : TID,
                firstName : firstName,
                lastName : lastName,
                email : email,
            }
            cb(student, null);
        }
        else{
            cb(null, null);//no result no error            
        }

        
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

module.exports = {getStudent, createStudent, updateStudent}