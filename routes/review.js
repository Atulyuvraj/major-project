const express=require("express")
const route=express.Router({mergeParams:true})
const ExpressError=require("../utils/ExpressError.js");
const List=require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Review=require("../models/reviews.js")
const {isOwner, isOwnerR}=require("../middleware.js")
const reviewController=require("../controller/reviews.js")



route.delete("/listings/:id/delete/:reviewId",isOwnerR,wrapAsync(reviewController.reviewDelete))

route.post("/listings/:id/review", wrapAsync(reviewController.createReview))

module.exports=route