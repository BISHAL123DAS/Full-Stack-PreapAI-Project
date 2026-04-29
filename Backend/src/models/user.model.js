const mongoose =require("mongoose")

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"user name already taken"],
        required:true
    },
    email:{
        type:String,
        unique:[true,"Account already exist with thie email address"],
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
const userModal =mongoose.model("users",userSchema)

module.exports=userModal