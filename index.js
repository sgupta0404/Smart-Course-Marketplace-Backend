require("dotenv").config();
const express=require("express");
const mongoose=require("mongoose");

const {createuserroute, userrouter}=require("./routes/user")
const {createcourseroute, courserouter}=require("./routes/course");
const { adminrouter } = require("./routes/admin");

const app=express();
app.use(express.json())
app.use("/api/v1/user",userrouter)
app.use("/api/v1/admin",adminrouter)
app.use("api/v1/course",courserouter)//it means any reqyest that comes to /api/v1/course will be 
//transferred to courserouter where further route will give desired result.

// createuserroute(app);
// createcourseroute(app);

//if any error occurs while connecting to mongodb, backend will not start
async function main(){
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(3000); 
    console.log("listening on port 3000")  
}

main()