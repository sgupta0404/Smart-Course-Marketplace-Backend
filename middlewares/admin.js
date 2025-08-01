const jwt=require("jsonwebtoken");
const {JWT_ADMIN_PASSWORD}=require("../config")

function authadmin(req,res,next){
    const token=req.headers.authorization;

    const response=jwt.verify(token,JWT_ADMIN_PASSWORD);
    
    if(response){
        req.adminId=response.id;
        next();
    }
    else{
        res.status(403).json("Incorrect Credentials");
    }
}

module.exports={
    authadmin:authadmin
}