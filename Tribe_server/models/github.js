const mongoose=require('mongoose');

const github_data=mongoose.model("github_data",{
    id_user:{
        type:String,
        required:true
    },
    login:{
        type:String,
        required:true
    },
    repos_data:{
        type:Array
    },
    access_token:{
        type:String,
        required:true
    },
    git_score:{
        type:String
    }
});

module.exports=github_data;