const mongoose=require('mongoose');

const dev_tech=mongoose.model("dev_tech",{
    domain:{
        type:String
    },
    id_user:{
        type:String
    },
    skills:{
        type:Array
    },
    name:{
        type:String
    },
    email:{
        type:String
    }
});

module.exports=dev_tech;