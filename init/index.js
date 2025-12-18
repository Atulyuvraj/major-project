const mongoose=require("mongoose")
const initData=require("./data.js")
const List=require("../models/listing.js")
main().then(()=>{
    console.log("the app is connected to the DB")
})

async function main(){
   await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust')
}

const initDB= async  ()=>{
 await List.deleteMany({});
 initData.data=initData.data.map((obj)=>({...obj,owner:"6936f3fb86e96e6e64446c36"}))
 await List.insertMany(initData.data);
 console.log("yes , the data is inserted")
};

initDB()