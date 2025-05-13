const certificateModel = require("../model/certificateModel");

const uploadCertificate = (req,res)=>{

    const certificate = {
        Data : req.body.Data,
        TID : req.user.TID,
        USN : req.user.USN,
        Title : req.body.title,
        Tag : req.body.tag,
        Path : req.body.path,
        Date : req.body.date
    }
    console.log(certificate);
    certificateModel.uploadCertificate(certificate, (result)=>{
        if(result.error){
            return res.status(500).send({message : "failed", error: result.error});
            
        }
        return res.status(200).send({message : "success"});
    })
}

module.exports = {uploadCertificate};