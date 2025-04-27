const mongoose = require("mongoose")

const studentSchema = mongoose.Schema({
    USN: { type: String, required: true },
    TID : {type:String, required:true},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
})

const studentModel = mongoose.model("students", studentSchema);

const getStudent = async (usn, cb)=>{
    try{
        const result = await studentModel.findOne( { USN : usn } );
        cb(result, null);
    }catch(err){
        cb(null, err);
    }
}

module.exports = {getStudent}