const mongoose=require('mongoose');

const job_meeting=mongoose.model("job_meeting",{
    id_user:{
        type:String
    },
    meetings:{
        type:Array
    }
});

module.exports=job_meeting;