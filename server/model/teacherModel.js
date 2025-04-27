const mongoose = require("mongoose")

const teacherSchema = mongoose.Schema({
    TID: { type: String, required: true , unique : true},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true , unique : true},
    password: { type: String, required: true }
})

const teacherModel = mongoose.model("teachers", teacherSchema);

const getTeacher = async (tid, cb)=>{
    try{
        const result = await teacherModel.findOne( { TID : tid } );
        if(result){
            const {TID, firstName, lastName, email} = result;
            const teacher = {
                TID : TID,
                firstName : firstName,
                lastName : lastName,
                email : email,
            }
            cb(teacher, null);
        }
        else{
            cb(null, null)
        }

        
    }catch(err){
        cb(null, err);
    }
}

const createTeacher = async (teacher, cb)=>{
    try{
        console.log("teacher : ", teacher);
        await teacherModel.insertOne(teacher);
        cb({message : "Success", error : null});
    }catch(err){
        cb({message : "Failed to create teacher", error : err});
    }
}

module.exports = {getTeacher, createTeacher}