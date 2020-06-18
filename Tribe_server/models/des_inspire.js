const mongoose=require('mongoose');

const des_inspire=mongoose.model("des_inspire",{
    inspiration:{
        type:Array
    }
});

module.exports=des_inspire;