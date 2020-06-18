const mongoose = require('mongoose');

const rec_info =  mongoose.model('rec_info', {
    id_user:{
        type:String,
        required:true
    },
    company_name:{
        type:String,
        trim:true
    },
    company_about:{
        type:String,
        trim:true
    },
    company_logo:{
        type:Object
    },
    job_posts:{
        type:Array
    }
    
})

module.exports = rec_info;