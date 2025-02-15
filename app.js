//requiring all important modules and setting up the server
const express=require("express");
const app=express();
const path=require("path");
const expressSession=require("express-session");
const flash=require("connect-flash");
const dotenv=require("dotenv").config();
const indexRouter=require("./routes/indexRouter");
const db=require("./config/mongoose-connection");
app.use(express.urlencoded({extended:true}));  //it is used to parse the incoming request
app.use(express.json());   //it is used to parse the incoming request
app.use(expressSession({
    resave:false,                                        //session middleware using it here for flash messages
    saveUninitialized:false,
    secret:process.env.EXPRESS_SESSION_SECRET
}))
app.use(flash())                                         //flash middleware
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");    //setting view engine
app.use("/",indexRouter);       //using index router
app.listen(3000);