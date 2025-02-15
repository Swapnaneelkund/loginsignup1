const express = require("express");
const router = express.Router();
const {registerUser,loginUser}=require("../controllers/authController");
router.get("/", (req, res) => {
    let error = req.flash("error");             //flash message
    res.render("index", { error });             //rendering index page
});
router.post("/register",registerUser);                    //register route
router.post("/login",loginUser);                          //login route
module.exports = router; 
