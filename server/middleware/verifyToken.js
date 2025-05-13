const SECRET_KEY = process.env.SECRET_KEY
const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "Access denied. No token provided" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).send({ message: "Invalid token" });
  }
};


const verifyTokenLogin = (req,res)=>{
    const {token} = req.body;
    try{
        jwt.verify(token, SECRET_KEY);
        return res.status(200).send({message : "logged in"});
    }catch(err){
       return  res.status(401).send({message : "please login"});
    }
}

module.exports = {verifyToken, verifyTokenLogin} 