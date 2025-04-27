const {getStudent} = require("../model/studentModel");

const findStudent = (req,res)=>{
    //verify json-web token to get userid/USN 
    const {usn} = req.body; // fetching from request body for testing 
    getStudent(usn, (result, err)=>{
        if(err){
            console.error("Failed to fetch student\n", err);
            return res.status(500).send({message:"Failed to fetch student", error: err.message})
        }
        if(!result){
            return res.status(404).send({message : "student not found"});
        }
        res.status(200).send(result);
    })
}

module.exports = {findStudent}