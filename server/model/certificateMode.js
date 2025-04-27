const mongoose = require("mongoose");

const certificateSchema = mongoose.Schema({
    USN : {type:String, required : true},
    TID : {type:String, required:true},
    Title : {type:String, required:true},
    Description : {Type:String, required:true}
})