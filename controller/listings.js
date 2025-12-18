const List=require("../models/listing.js");

module.exports.index=async (req, res) => {
  const alllists = await List.find();
  res.render("listings/index.ejs", { alllists });}

module.exports.show=async (req,res)=>{
    let {id}=req.params;
    const list1=await List.findById(id).populate({path:"reviews",populate:{path:"author"}})
    .populate("owner");
    
    if(!list1){
        req.flash("error","SORRY THE LISTING YOU HAVE REQUESTED IS DELETED");
        return res.redirect("/listings")
    }
    res.render("listings/show.ejs",{list1})
    console.log(list1)

}

module.exports.new=async(req,res)=>{ 
    res.render("listings/new.ejs")
}

module.exports.new2=async(req,res,next)=>{
    let {title,description,image,price,location,country}=req.body  
    let url=req.file.path
    let filename=req.file.filename
    const newL=new List({
        title:title,
        description:description,
        image:image,
        price:price,
        location:location,
        country:country,
        
    });
    newL.owner=req.user._id;
    newL.image={url,filename}
    await newL.save();
    console.log(req.file)
    req.flash("success","NEW POST CREATED!")
    res.redirect("/listings")
}

module.exports.edit=async(req,res)=>{
    let {id}=req.params
    let list2=await List.findById(id)
    if(!list2){
        req.flash("error","SORRY THE LISTING YOU HAVE REQUESTED IS DELETED");
        return res.redirect("/listings")
    }
    res.render("listings/edit.ejs",{list2})
}

module.exports.edit2=async (req,res)=>{    
let {id}=req.params;
let {title,description,price,image,location,country}=req.body;
let list=await List.findByIdAndUpdate(id,{title:title,
    description:description,
    price:price,image:image,location:location,country:country,
});
if(typeof req.file!=="undefined"){
    let url=req.file.path;
    let filename=req.file.filename;
    list.image={url,filename};
    await list.save()
    }

req.flash("success","LISTING UPDATE!")
res.redirect("/listings");
}

module.exports.delete=async (req,res)=>{
    let {id}=req.params;
    await List.findByIdAndDelete(id);
    req.flash("success","LISTING DELETED!!")
    res.redirect("/listings")
}