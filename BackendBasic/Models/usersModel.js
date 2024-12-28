const mongoose=require('mongoose');

/// create schema(collections)
const userSchema=new mongoose.Schema({
    id :{
        type:Number,
        require:true,
        unique:true
    },
    name:{
        type:String,
        require:true,
        minLenngth:4
    },
    age:{
        type:Number,
        require:true,
        min:18,
        max:100
    }

})
// create models(constructor)
const UsersModel=mongoose.model('karthiksuser',userSchema);
module.exports=UsersModel;