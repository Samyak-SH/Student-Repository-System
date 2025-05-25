const certificateModel = require("../model/certificateModel");

const uploadCertificate = (req, res) => {
  const certificate = {
    Data: req.body.Data,
    TID: req.user.TID,
    USN: req.user.USN,
    Department: req.user.department,
    Title: req.body.title,
    Tag: req.body.tag,
    Path: req.body.path,
    Date: req.body.date,
  };

  console.log(certificate);

  certificateModel.uploadCertificate(certificate, (err) => {
    if (err) {
      return res.status(500).send({ message: "failed", error: err });
    }
    return res.status(200).send({ message: "success" });
  });
};

const getStudentCertificate = (req, res) => {
  console.log(req.user.USN);
  certificateModel.getStudentCertificate(req.user.USN, (err, result) => {
    if (err) {
      return res.status(500).send({ message: "internal server error", error: err });
    }
    if (!result || result.length === 0) {
      return res.status(200).send({ message: "no certificates" });
    }
    return res.status(200).send(result);
  });
};

const getStudentCertificateByTeacher = (req, res) => {
  console.log(req.query.USN);

  certificateModel.getStudentCertificate(req.query.USN, (err, result) => {
    if (err) {
      return res.status(500).send({ message: "internal server error", error: err });
    }
    if (!result || result.length === 0) {
      return res.status(200).send({ message: "no certificates" });
    }
    return res.status(200).send(result);
  });
};

module.exports = {
  uploadCertificate,
  getStudentCertificate,
  getStudentCertificateByTeacher,
};
