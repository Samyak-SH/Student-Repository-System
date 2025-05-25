const mongoose = require("mongoose");

const certificateSchema = mongoose.Schema({
  USN: { type: String, required: true },
  TID: { type: String, required: true },
  Data: { type: String, required: true },
  Date: { type: Date, default: Date.now },
  Department: { type: String, default: 'Unknown' },
  Title: { type: String, required: true },
  Tag: { type: String, required: true },
  Path: { type: String, required: true },
});

const CertificateModel = mongoose.model("certificates", certificateSchema);

const uploadCertificate = async (certificate, cb) => {
  try {
    await CertificateModel.create(certificate);
    cb(null); // no error
  } catch (err) {
    console.error(err);
    cb(err.message); // pass error message to callback
  }
};

const getStudentCertificate = async (USN, cb) => {
  try {
    const result = await CertificateModel.find({ USN });
    cb(null, result); // no error
  } catch (err) {
    console.error(err);
    cb(err.message, null); // error
  }
};

module.exports = {
  uploadCertificate,
  getStudentCertificate,
};
