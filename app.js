if(process.env.NODE_ENV!="production"){
    require('dotenv').config()
}
const express=require("express")
const app=express()
const mongoose=require("mongoose");
const List=require("./models/listing.js");
const path=require("path");
const methodOverride = require("method-override");
const ejsMate=require("ejs-mate");

const ExpressError=require("./utils/ExpressError.js");
const {listSchema}=require("./schema.js")
const Review=require("./models/reviews.js")
const { asyncWrapProviders } = require("async_hooks");
const wrapAsync = require("./utils/wrapAsync.js");
const listingss=require("./routes/listing.js")
const reviewss=require("./routes/review.js")
const userss=require("./routes/user.js")
const cookieParser=require("cookie-parser")
const session=require("express-session")
const MongoStore = require('connect-mongo').default;
const flash=require("connect-flash")
const passport=require("passport")
const LocalStrategy=require("passport-local")
const User=require("./models/user.js")
const url="mongodb+srv://delta-student:IJ6RZIuUsr6SPwP1@cluster0.wfx0etw.mongodb.net/?appName=Cluster0";
const axios=require("axios")
const requests=require("requests")
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
mongoose.set('strictQuery',true)
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(cookieParser())
const store=new MongoStore({
    mongoUrl:url,
    crypto:{
        secret : "mysecrete"
    },
    touchAfter:24*3600
})
app.use(session({store,secret : "mysecrete",resave:false,saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true
    }
}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())


app.use((req,res,next)=>{
    res.locals.success=req.flash("success")
    res.locals.error=req.flash("error")
    res.locals.currUser=req.user
    next();
})
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
main().then(()=>{
    console.log("the app is connected to the DB")
})

async function main(){
   await mongoose.connect(url)}

app.use("/",listingss)
app.use("/",reviewss)
app.use("/",userss  )

app.get("/demo",async (req,res)=>{
    let fake= new User({
        email:"yuvraj@gamil.com",
        username:"Atul1"
    })
    let result= await User.register(fake,"helloworld")
    res.send(result)
})
app.get("/testing",wrapAsync(async(req,res)=>{
    const newL=new List({
        title:"My new villa",
        discription:"By the beach",
        price:1200,
        location:"Goa",
        country:"India",
    });
   await newL.save();
   res.send("testing sucessfull")
}));

app.get("/cookies",(req,res)=>{
   let {name}=req.cookies
   res.send(`kya haal h ${name}`)
    
    
})


app.use((err,req,res,next)=>{
   let{status=500,message="something went wrong"}=err;
    res.render("listings/error.ejs",{err})
    
    
})
app.listen(8080,()=>{
    console.log("app is listning")
})