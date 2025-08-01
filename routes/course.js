// const express=require("express");


// function createcourseroute(app){
    // app.get('/course/purchase',function(req,res){
    // res.json({mesasge:"you are signed up"});
    // })
    
    // app.post('/course/preview',function(req,res){
    //     res.json({mesasge:"you are signed up"});
    // })

// }

// module.exports={
//     createcourseroute:createcourseroute
// }

//OR

const {Router}=require("express");
const courserouter=Router();
const {coursemodel, purchasemodel}=require("../db");
const {authuser}=require("../middlewares/user")


courserouter.post('/purchase',authuser,async function(req,res){
    const userId=req.userId;
    const courseId=req.body.courseId;

    await purchasemodel.create({
        userId,
        courseId
    })

    res.json({mesasge:"Course purchase successful"});
})

courserouter.get('/preview',async function(req,res){
   
    const courses=await coursemodel.find({})
   
    res.json({courses});
})

module.exports={
    courserouter:courserouter
}