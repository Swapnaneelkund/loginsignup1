//Requiring all important modules and setting up the server
const express=require("express");
const app=express();
const path=require("path");
const expressSession=require("express-session");
const flash=require("connect-flash");
const dotenv=require("dotenv").config();
const indexRouter=require("./routes/indexRouter");
const db=require("./config/mongoose-connection");
app.use(express.urlencoded({extended:true}));  //Parse the incoming request
app.use(express.jsonS());   // Parse the incoming request
app.use(expressSession({
    resave:false,                                        //Session Middleware 
    saveUninitialized:false,
    secret:process.env.EXPRESS_SESSION_SECRET
}))
app.use(flash())                                         //Flash Middleware
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");    //Setting View Engine
app.use("/",indexRouter);       
app.listen(3000);