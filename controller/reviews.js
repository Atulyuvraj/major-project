const List=require("../models/listing.js");
const Review=require("../models/reviews.js")

module.exports.createReview=async(req,res)=>{
    let {id}=req.params
    let listings=await List.findById(id);
    let {comment,rating}=req.body;
    let newR=new Review({
        comment:comment,
        rating:rating,
        createdAt:Date.now()
    })
    newR.author=req.user._id
    listings.reviews.push(newR)
    await newR.save();
    await listings.save();
    console.log("review is saved")
    req.flash("success","POSTED NEW REVIEW")
    res.redirect(`/listings/${listings._id}`)

}

module.exports.reviewDelete=async(req,res)=>{
    let{id,reviewId}=req.params;
    await List.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","REVIEW DELETED!!")
    res.redirect(`/listings/${id}`)
}