const certificateModel = require("../model/certificateModel");

const uploadCertificate = (req,res)=>{

    const certificate = {
        Data : req.body.Data,
        TID : req.user.TID,
        USN : req.user.USN,
        Department : req.user.department,
        Title : req.body.title,
        Tag : req.body.tag,
        Path : req.body.path,
        Date : req.body.date,        
    }
    console.log(certificate);
    certificateModel.uploadCertificate(certificate, (result)=>{
        if(result.error){
            return res.status(500).send({message : "failed", error: result.error});
            
        }
        return res.status(200).send({message : "success"});
    })
}

const getStudentCertificate = (req,res)=>{
    console.log(req.user.USN);
    certificateModel.getStudentCertificate(req.user.USN, (result, err)=>{
        if(err){
            return res.status(500).send({message : "internal server error"});
        }
        if(result.length == 0){
            return res.status(200).send({message : "no certificates"});
        }
        return res.status(200).send(result);
    })

}

const getStudentCertificateByTeacher = (req, res) => {
  console.log(req.param);

  certificateModel.getStudentCertificate(req.params.USN, (err, result) => {
    if (err) {
      return res.status(500).send({ message: "internal server error" });
    }
    if (result.length === 0) {
      return res.status(200).send({ message: "no certificates" });
    }
    return res.status(200).send(result);
  });
};




module.exports = {uploadCertificate, getStudentCertificate, getStudentCertificateByTeacher};