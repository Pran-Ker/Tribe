const mongoose=require('mongoose');

const des_portfolio_model=mongoose.model("des_portfolio_model",{
    id_user:{
        type:String,
        required:true
    },
    about:{
        type:String
        
    },
    social:{
        type:Array
        
    },
    skills:{
        type:Array
        
    },
    logo:{
        type:Object
    },
    pic:{
        type:Object
    },
    bestWorks:{
        type: Array
    }
});

module.exports=des_portfolio_model;