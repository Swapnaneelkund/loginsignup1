const joi = require("joi");
const bcrypt=require("bcrypt");
const userModel=require("../models/user-model");
module.exports.registerUser=async function(req,res){
    try {
        const { email, password, fullname } = req.body;
        const registration = joi.object({
            fullname: joi.string().min(2).max(40).required(),   //data validation by joi
            email: joi.string().email().required(),
            password: joi.string().min(9).required()
        })
        const {error}=registration.validate(
            {email,password,fullname},                              //validation
            {abortEarly:false}
        )
        if(error){
            req.flash('error', error.message);                                //error handling
            return res.redirect('/');                                      
        }
        const salt=await bcrypt.genSalt(10);
        const hashpassword=await bcrypt.hash(password,salt);                   //hashing password
        try{
            const user=await userModel.create({
                fullname,                                     //creating user
                password:hashpassword,
                email
            });
             return res.send("register its working")     //setting cookie
        }catch(error){
            if(error.code===11000){ //duplicate key error
                req.flash('error', 'This email is already registered. Please use a different email.');
                return res.redirect('/');
            }else{
                req.flash('error', 'Internal server error');       //error handling
                return res.redirect('/');            }
        }
        
        

    } catch (error) {
       return res.send(error.message)
    }
}
//login feature
module.exports.loginUser=async function(req,res){
    let {email,password}=req.body
    if(!email||!password) {                                      //checking for empty fields
        req.flash("error","Login:Enter the field properly")
        return res.redirect("/")
    }
    const user=await userModel.findOne({email:email});
    if(!user) {
        req.flash("error","Login:email or password invalid")
        return res.redirect("/")
    }
    bcrypt.compare(password,user.password,(err,result)=>{     //comparing password
        if(err){
           console.log("err",err)
           req.flash("error","Internal server problem")          
           return res.redirect("/")
        }
        if(!result){
            req.flash("error","Login:email or password invalid")
            return res.redirect("/")
        }
        return res.send("logged in its working");
        
    })
}
