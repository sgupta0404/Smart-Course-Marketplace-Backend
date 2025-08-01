const {Router}= require("express");
const adminrouter=Router();
const jwt=require("jsonwebtoken");
const {adminmodel,coursemodel}=require('../db');
const {authadmin}=require("../middlewares/admin");
const { JWT_ADMIN_PASSWORD } = require("../config");

adminrouter.post("/signup",async function(req,res){
    const {email,password,firstname,lastname}=req.body;

    await adminmodel.create({
        firstname:firstname,
        lastname:lastname,
        email:email,
        password:password
    })
    res.json({message:"Admin signup successful"});
})

adminrouter.post("/signin",async function(req,res){
    const {email,password}=req.body;

    const admin=await adminmodel.findOne({
        email:email,
        password:password
    })
    if(admin){
        const token=jwt.sign({id:admin._id},JWT_ADMIN_PASSWORD)
        res.json({token});
    }else{
        res.status(403).json({message:"Incorrect Credentials"})
    }

})

adminrouter.post("/create",authadmin,async function(req,res){
    const adminid=req.adminId;
    const {title,description,price,imageUrl}=req.body;

    console.log("Creating course with:", { title, description, price, imageUrl, creatorId: adminid });
    const course=await coursemodel.create({
        title:title,
        description:description,
        price:price,
        imageUrl:imageUrl, 
        creatorId:adminid
    })
    res.json({message:"New Course Successfully created" , courseId:course._id});
})

adminrouter.put("/course",authadmin,async function (req,res){
    const {courseId,title, description,price,imageUrl}=req.body;

    const adminid=req.adminId;

    const course=await coursemodel.updateOne({
        _id:courseId,
        creatorId:adminid
    },{
        title:title,
        description:description,
        price:price,
        imageUrl:imageUrl
    })

    res.json({message:"Course Updated",courseId:course._id})
});


adminrouter.get("/course/bulk",authadmin,async function(req,res){
    const adminid=req.adminId;

    const courses=await coursemodel.find({creatorId:adminid})
    
    res.json({message:"Updated courses are:",courses});
});


module.exports={
    adminrouter:adminrouter
}