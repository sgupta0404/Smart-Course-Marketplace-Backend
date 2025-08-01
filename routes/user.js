// Ugly Way to handle routes

// const express=require("express");

// function createuserroute(app){
    // app.post('/user/signup',function(req,res){
    // res.json({mesasge:"you are signed up"});
    // })

    // app.post('/user/signin',function(req,res){
    //     res.json({mesasge:"you are signed up"});
    // })

    // app.get('/user/purchases',function(req,res){
    //     res.json({mesasge:"you are signed up"});
    // })
    

// }

// module.exports={
//     createuserroute:createuserroute
// }


// Slightly cleaner way to handle routes



// const express=require("express");
// const Router=express.Router;

// OR

const {Router}=require("express");
const userrouter=Router();
const jwt=require("jsonwebtoken");
const {usermodel,purchasemodel, coursemodel}=require('../db');
const {authuser}=require("../middlewares/user");
const { JWT_USER_PASSWORD } = require("../config");

userrouter.post('/signup',async function(req,res){
    const {firstname,lastname,email,password}=req.body;
    
    await usermodel.create({
        firstname:firstname,
        lastname:lastname,
        email:email,
        password:password
    })

    res.json({mesasge:"User signup successful"});
})

userrouter.post('/signin',authuser,async function(req,res){
    
    const {email,password}=req.body;

    const user= await usermodel.findOne({
        email,
        password
    })
    
    if(user){
        const token=jwt.sign({id:user._id},JWT_USER_PASSWORD);
        res.json({token});
    }
    else{
        res.status(403).json({mesasge:"Incorrect Credentials"});
    }
})

userrouter.get('/purchases',authuser,async function(req,res){
    const userid=req.userId; 

    const purchases=await purchasemodel.find({
        userid
    })

    const purchasedcourseid=[];

    for(let i=0;i<purchases.length;i++){
        purchasedcourseid.push(purchases[i].courseId);
    }

    const courses=await coursemodel.find({_id:{$in:purchasedcourseid}})
    // $in is a MongoDB operator used to match any of the values specified in an array.
    // eg: { _id: { $in: [id1, id2, id3] } }
    // means: return all documents where _id is either id1, id2, or id3.
    //purchasedcourseid in not a field defined in schema so we need to write in this format.

    res.json({purchases,courses});
})

module.exports={
    userrouter:userrouter
}
