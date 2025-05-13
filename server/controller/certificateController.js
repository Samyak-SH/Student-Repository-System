const certificateModel = require("../model/certificateModel");

const uploadCertificate = (req,res)=>{
    console.log("BOdy", req.body);

    const certificate = {
        Data : req.body.Data,
        TID : req.body.TID,
        USN : req.body.USN,
        Title : req.body.Title,
        Tag : req.body.Tag,
    }
    certificateModel.uploadCertificate(certificate, (result)=>{
        if(result.error){
            res.status(500).send({message : "failed", error: result.error});
            return;
        }
        res.status(200).send({message : "success"});
    })
}

module.exports = {uploadCertificate};