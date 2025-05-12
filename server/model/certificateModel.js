const mongoose = require("mongoose");

const certificateSchema = mongoose.Schema({
    USN : {type:String, required : true},
    TID : {type:String, required:true},
    Data : {type:String, requried: true},
    Date : {type:Date, default : Date.now},
    Title : {type:String, required:true},
    Tag : {type:String, required:true},
    Path : {type:String, required:true},
})

const certificateModel = mongoose.model("certificates", certificateSchema);

const uploadCertificate = async (certificate, cb)=>{
    try{
        console.log("uploading certificate");
        cb({message : "success"});
    }
    catch(err){
        console.error(err);
        cb({message : "unsuccessfull", error:err.message});
    }
}

module.exports = {uploadCertificate};