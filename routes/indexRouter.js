const express = require("express");
const router = express.Router();
const {registerUser,loginUser}=require("../controllers/authController");
router.get("/", (req, res) => {
    let error = req.flash("error");             //Flash Message
    res.render("index", { error });             //Rendering 
});
router.post("/register",registerUser);                    //Register Route
router.post("/login",loginUser);                          //Login Route
module.exports = router; 
