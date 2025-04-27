const SECRETKEY = process.env.SECRETKEY

const verifyToken = (req,res,next)=>{
    //verify jwt token for 3 cases
    //1) valid token
    //2) invalid token (wrong token)
    //3) no token
    //store decoded value in req.user like req.user = decoded from callback of jwt.verify()
    console.log("hit middleware");
    next();
}

module.exports = {verifyToken}