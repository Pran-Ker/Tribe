require('../db/mongoose')
const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt');
const request=require('request');
const path=require('path');
const hbs=require('hbs');
const jwt=require('jsonwebtoken');
const rec_model=require('../models/rec_model');
const rec_info=require('../models/rec_info');
const axios=require('axios');
const multer=require('multer');

const upload_rec_files=new express.Router();

const post=bodyParser.urlencoded({extended:false});

var id_user;

const storage2=multer.diskStorage({
    destination:'../uploads/uploads_rec/logo/',
    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+req.headers.id_user+path.extname(file.originalname));
    }
});

const upload2 = multer({
    storage:storage2,
    fileFilter:function(req,file,cb){
        checkFileType(file,cb);
    }
}).single('reclogo');

function checkFileType(file,cb){
    const filetypes=/jpeg|jpg|png|gif/;
    const extname=filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype=filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null,true)
    }
    else{
        cb('Images only');
    }
}

upload_rec_files.post("/rec_info_logo",post,(req,res)=>{


    upload2(req,res,(err)=>{
        if(err)
        {
            res.send({error:"img_only"})
        }
        else
        { 
            console.log(req.body)
            console.log(req.file)
            rec_info.find({id_user:req.body.id_user}).then((user)=>{
                user[0].company_logo=req.file;
                user[0].save();
                res.send({result:"success"})
            }).catch((e)=>{
                res.send({error:"tech_issue"})
            })
        }
    })
     
})

module.exports=upload_rec_files;