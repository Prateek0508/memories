const mongoose=require('mongoose');
const path=require('path');
require('dotenv').config({path:'../.env'}) 
const database=process.env.DB_STRING || "mongodb+srv://memories:Prateek@321@cluster0.scb9p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(database,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
})
.then(()=>{
    console.log("databse connected")
})