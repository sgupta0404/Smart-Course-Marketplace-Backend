const jwt=require("jsonwebtoken");
const {JWT_USER_PASSWORD}=require("../config");

function authuser(req,res,next){
    const token=req.headers.authorization;

    const response=jwt.verify(token,JWT_USER_PASSWORD);

    if(response){
        req.userId=response.id;
        next();
    }
    else{
        res.status(403).json({message:"Incorrect Credentials"});
    }

}

module.exports={
    authuser:authuser
}
