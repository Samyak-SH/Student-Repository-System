const mongoose = require("mongoose");

const certificateSchema = mongoose.Schema({
    USN : {type:String, required : true},
    TID : {type:String, required:true},
    Data : {type:String, requried: true},
    Date : {type:Date, default : Date.now},
    Department : {type:String, default:'Unknown'},
    Title : {type:String, required:true},
    Tag : {type:String, required:true},
    Path : {type:String, required:true},
})

const certificateModel = mongoose.model("certificates", certificateSchema);

const uploadCertificate = async (certificate, cb)=>{
    try{
        const result = await certificateModel.insertOne(certificate);
        cb({error : null});
    }
    catch(err){
        console.error(err);
        cb({message : "unsuccessfull", error:err.message});
    }
}

const getStudentCertificate = async (USN, cb)=>{
    try{
        const result = await certificateModel.find({USN : USN});
        cb(result, null);
    }
    catch(err){
        console.error(err);
        cb(null, err.message);
    }
}

module.exports = {uploadCertificate, getStudentCertificate};