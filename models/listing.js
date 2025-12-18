const mongoose=require("mongoose");
const { type } = require("requests");
const Review=require("./reviews.js")
const User=require("./user.js")

const listSchema=new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url:String,
    fiename:String,
  },
  price: Number,
  location: String,
  country: String,
  reviews:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Review"
  }],
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }
});

listSchema.post("findOneAndDelete",async (listing)=>{
  if(listing){
    await Review.deleteMany({_id:{$in:listing.reviews}})
  }
})

const List= mongoose.model("List",listSchema);
module.exports= List;