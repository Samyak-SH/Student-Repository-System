const mongoose = require("mongoose");

const certificateSchema = mongoose.Schema({
    SID : {type:String, required : true},
    Title : {type:String, required:true},
    Description : {Type:String, required:true}
})