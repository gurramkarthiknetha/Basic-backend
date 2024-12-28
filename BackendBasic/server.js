// create express application
const express=require('express')
const app=express();
const mongoose=require('mongoose')
//import the mini apis here
const userapp=require('./Apis/UserApi/UserApp')

// pass req to sepecific api based on begining path url
app.use('/user-api',userapp);


///// conection of DB
async function connectTODB()
{
    try{
    await mongoose.connect('mongodb://127.0.0.1:27017/karthikdb');
    console.log('Successfully connected to db..')
    //assigin the port 
    app.listen(3000,()=>{console.log("app is running on port 3000 http//:localhost:3000")})
}catch(e){
    console.log(e);
}
}
connectTODB();
