const teacherModel = require("../model/teacherModel");

const getTeacher = (req, res) => {
    const { email, password } = req.body;

    teacherModel.getTeacher(email, password, (err, result) => {
        if (err) {
            console.error("Error while fetching teacher", err);
            return res.status(500).send({ message: "Server error", error: err.message });
        }

        if (result.message === "wrong password") {
            return res.status(401).send({ message: "Unauthorized: wrong password" });
        }

        if (result.message === "user not found") {
            return res.status(404).send({ message: "User not found" });
        }
        return res.status(200).header("x-auth-token", result.token).send({ message: "success" });
    });
};


const createTeacher = (req,res)=>{
    //todo hash password
    const teacher = {
        TID : req.body.TID,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : req.body.password
    }
    //todo create JWT and return to user
    teacherModel.createTeacher(teacher, (result)=>{
        if(result.err){
            console.error(result.message, result.error.message);
            return res.status(500).send({message : result.message, error:result.error.message});
        }
        res.status(200).send({message : result.message});
    })
}

module.exports = {getTeacher, createTeacher}