const mongoose = require("mongoose")
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

const teacherSchema = mongoose.Schema({
    TID: { type: String, required: true , unique : true},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true , unique : true},
    password: { type: String, required: true }
})

const teacherModel = mongoose.model("teachers", teacherSchema);

const getTeacher = async (incoming_email, incoming_pass, cb) => {
    console.log("secret key", SECRET_KEY)
    try {
        const result = await teacherModel.findOne({ email: incoming_email });
        if (result) {
            const { TID, firstName, lastName, email, password } = result;

            if (password !== incoming_pass) {
                return cb(null, { message: "wrong password" });
            }

            const payload = { TID, firstName, lastName, email };
            const token = jwt.sign(payload, SECRET_KEY);

            return cb(null, { message: "success", token });
        } else {
            return cb(null, { message: "user not found" });
        }

    } catch (err) {
        return cb(err, null);
    }
};


const createTeacher = async (teacher, cb)=>{
    try{
        console.log("teacher : ", teacher);
        await teacherModel.insertOne(teacher);
        cb({message : "Success", error : null});
    }catch(err){
        cb({message : "Failed to create teacher", error : err});
    }
}

module.exports = {getTeacher, createTeacher}