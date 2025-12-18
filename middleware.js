const List=require("./models/listing.js");
const Review=require("./models/reviews.js")
module.exports.isLogged=(req,res,next)=>{
    console.log(req)
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl
        req.flash("error","YOU HAVE TO LOGIN FIRST")
        return res.redirect("/login")
    } next();
}

module.exports.OriginalUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl
    }next()
}

module.exports.isOwner= async (req,res,next)=>{
    let {id}=req.params
    let newL=await List.findById(id)
    if(!newL.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","YOU ARE NOT THE OWNER OF THIS LISTING")
        return res.redirect(`/listings/${id}`)
    }next()
}
module.exports.isOwnerR= async (req,res,next)=>{
    let{reviewId}=req.params;
    let Rev=Review.findById(reviewId)
    if(!res.locals.currUser&&res.locals.currUser._id.equals(Rev.author._id)){
        req.flash("error","YOU ARE NOT THE OWNER OF THIS REVIEW")
    }next()
}