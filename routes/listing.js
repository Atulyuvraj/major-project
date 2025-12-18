const express=require("express")
const route=express.Router()
const {isLogged, isOwner}=require("../middleware.js")
const ExpressError=require("../utils/ExpressError.js");
const List=require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const listingController=require("../controller/listings.js")
const multer  = require('multer')
const {storage}=require("../cloudconfig.js")
const upload = multer({ storage })

route.delete("/listings/:id",isLogged,isOwner ,wrapAsync(listingController.delete))

route.put("/listings/:id",isLogged,upload.single('image'),wrapAsync(listingController.edit2));

route.get("/listings/:id/edit",isLogged,isOwner,wrapAsync(listingController.edit));

route.post("/listingss",isLogged,upload.single('image'), wrapAsync(listingController.new2)   )

route.get("/listings/new",isLogged,wrapAsync(listingController.new))

route.get("/listings/:id",wrapAsync(listingController.show));

route.get("/listings",wrapAsync (listingController.index));

module.exports=route