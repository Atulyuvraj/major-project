const express=require("express")
const route=express.Router({mergeParams:true})
const User=require("../models/user.js")
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { OriginalUrl } = require("../middleware.js");
const userController=require("../controller/users.js")

route.get("/signup",wrapAsync (userController.signup))

route.post("/signup",wrapAsync (userController.signup2))

route.get("/login",wrapAsync(userController.login))

route.post("/login",OriginalUrl, passport.authenticate("local",
    {failureRedirect:"/login",failureFlash:true}),wrapAsync(userController.login2))

route.get("/logout",wrapAsync(userController.logout))

module.exports=route