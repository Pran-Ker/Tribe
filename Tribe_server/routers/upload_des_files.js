require('../db/mongoose')
const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt');
const request=require('request');
const path=require('path');
const hbs=require('hbs');
const jwt=require('jsonwebtoken');
const des_model=require('../models/des_model');
const des_portfolio_model=require('../models/des_portfolio_model');
const axios=require('axios');
const multer=require('multer');

const upload_des_files=new express.Router();

const post=bodyParser.urlencoded({extended:false});

var id_user;

const storage1=multer.diskStorage({
    destination:'../uploads/uploads_des/logo/',
    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+req.headers.id_user+path.extname(file.originalname));
    }
});

const upload1 = multer({
    storage:storage1,
    fileFilter:function(req,file,cb){
        checkFileType(file,cb);
    }
}).single('mylogo');

const storage2=multer.diskStorage({
    destination:'../uploads/uploads_des/pic/',
    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+req.headers.id_user+path.extname(file.originalname));
    }
});

const upload2 = multer({
    storage:storage2,
    fileFilter:function(req,file,cb){
        checkFileType(file,cb);
    }
}).single('mylogo');

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

upload_des_files.post("/upload/:id",post,(req,res)=>{
    if(req.params.id=="logo")
    {
        upload1(req,res,(err)=>{
            if(err)
            {
                res.send({error:"img_only"})
            }
            else
            { 
                des_portfolio_model.find({id_user:req.body.id_user}).then((user)=>{
                    user[0].logo=req.file;
                    user[0].save();
                    res.send({result:"success"})
                }).catch(()=>{
                    res.send({error:"tech_issue"})
                })
            }
        })
        
    }
    else if(req.params.id=="pic")
    {
        upload2(req,res,(err)=>{
            if(err)
            {
                res.send({error:"img_only"})
            }
            else
            { 
                console.log(req.body)
                console.log(req.file)
                des_portfolio_model.find({id_user:req.body.id_user}).then((user)=>{
                    user[0].pic=req.file;
                    user[0].save();
                    res.send({result:"success"})
                }).catch((e)=>{
                    res.send({error:"tech_issue"})
                })
            }
        })
    } 
})

module.exports=upload_des_files;