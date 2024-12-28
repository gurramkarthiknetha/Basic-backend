// create mini exp api 
const exp=require('express')
const userapp=exp.Router();
userapp.use(exp.json());
// import the models
const UsersModel=require('../../Models/usersModel');

//get the user routes
userapp.get('/users',async (req,res)=>{
    const usersList=await UsersModel.find();
    res.send({message:"Hello World",paypal:usersList});
})

//get by_id
userapp.get('/users/:_id',async(req,res)=>{
    try {
        const singleuser=await UsersModel.findById(req.params._id)
        res.send({message:"user :",payload:singleuser})
    } catch (e) {
        res.send({message:"Error has been occured",payload:e.message})
    }
})
//get by non-_id
userapp.get('/user/:name',async(req,res)=>{
    try {
        const singleuser=await UsersModel.find({name:req.params.name})
        res.send({message:"user :",payload:singleuser})
    } catch (e) {
        res.send({message:"Error has been occured",payload:e.message})
    }
})


// create the user 
userapp.post('/users',async(req,res)=>{
    try{
    //get user obj from the req
    const newuser=req.body;
    //create the user document
    const userdoc= new UsersModel(newuser) ;
    await userdoc.save();
    console.log(userdoc);
    res.send({message:"User created successfully !!"})
    }catch(e){
        res.send({message:"Error has been occured",payload:e.message})
    }

})

//update the user 
userapp.put('/users',async(req,res)=>{
    try {
        const updatedData =req.body
        const updatedDataDoc=await UsersModel.findOneAndUpdate(
            {id:updatedData.id},
            {$set:{...updatedData}},
            {new:true} // means the data after modifed will display
        )    
        res.send({payload:updatedDataDoc});
    } catch (e) {
        res.send({message:"Error has been occured",payload:e.message})
    }
})

// delete the user 
userapp.delete('/users/:id',async(req,res)=>{
    try {
        const deleteuser=await UsersModel.findOne({id:req.params.id})
        await UsersModel.deleteOne({id:req.params.id})
        res.send({message:"deleted"})
    } catch (e) {
        res.send({message:"Error has been occured",payload:e.message})
    }
})
// export 

module.exports=userapp;
