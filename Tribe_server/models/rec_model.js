const mongoose = require('mongoose');

const rec =  mongoose.model('rec', {
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
    contactNum:{
        type: String,
        required: true,
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
    
})

module.exports = rec;