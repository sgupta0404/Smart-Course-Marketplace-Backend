const mongoose=require("mongoose");

const Schema=mongoose.Schema;
const Objectid=Schema.Types.ObjectId;

const userschema=new Schema({
    firstname:String,
    lastname:String,
    email:{type: String,unique:true},
    password:String
})

const adminschema=new Schema({
    firstname:String,
    lastname:String,
    email:{type: String,unique:true},
    password:String
})

const cousrseschema=new Schema({
    title:String,
    description:String,
    price:Number,
    imageUrl:String,
    creatorId:{type:Objectid, ref:"admins" }
})

const purchaseschema=new Schema({
    courseId:{type:Objectid, ref:"courses"},
    userId:{type:Objectid, ref:"users"} 
})

const usermodel=mongoose.model("users",userschema);
const adminmodel=mongoose.model("admins",userschema);
const coursemodel=mongoose.model("courses",userschema);
const purchasemodel=mongoose.model("purchases",userschema);


module.exports={
    usermodel,adminmodel,coursemodel,purchasemodel
}
