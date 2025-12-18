const User=require("../models/user.js")


module.exports.signup=async (req,res)=>{
    res.render("users/signup.ejs")
}

module.exports.signup2=async (req,res,next)=>{
    try{let {username,email,password}=req.body
    let user1= await new User({username,email})
    const newU=await User.register(user1,password)
    req.login(newU,(err)=>{
        if(err){
            next(err)
        }
         req.flash("success","NEW USER REGISTERED")
    res.redirect("/listings")
    })
   
}catch(e){
    req.flash("error",e.message)
    res.redirect("/signup")
}
}

module.exports.login=async(req,res)=>{
    res.render("users/login.ejs")
}

module.exports.login2=  async(req,res)=>{
        req.flash("success","WELCOMEBACK TO wanderlust")
        let redirectUrl=res.locals.redirectUrl || "/listings"
        res.redirect(redirectUrl)
}

module.exports.logout=async(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err)
        }
        req.flash("success","LOGGED OUT")
        res.redirect("/listings")
    })
}