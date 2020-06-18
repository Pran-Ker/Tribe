const mongoose=require('mongoose');

const des=mongoose.model("des",{
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:7
    },
    designation:{
        type:String
    },
    domain:{
        type:String
    },
    tokens:{
        type:Array
    },
    verified:{
        type:Boolean,
        default:false
    },
    temporarytoken:{
        type:String,
    }
});

module.exports=des;