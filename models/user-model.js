const mongoose=require('mongoose');
//Mongodb model
const userSchema=mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        minLength:3,
        trim:true
    
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    }
})
const userModel=mongoose.model("User",userSchema);
module.exports=userModel;