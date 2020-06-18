const bestWorks = require('express').Router();
const multer = require('multer')
const path = require('path');
const des_portfolio_model=require('../models/des_portfolio_model');
const bodyParser=require('body-parser');
const des_inspire=require('../models/des_inspire');

const post=bodyParser.urlencoded({extended:false});
var pic_count=1;
const storage=multer.diskStorage({
    destination:'../uploads/uploads_des/des_works/',
    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+req.headers.id_user+'-'+pic_count+path.extname(file.originalname));
        pic_count++;
    }
});

const upload = multer({
    storage:storage,
    fileFilter:function(req,file,cb){
        checkFileType(file,cb);
    }
}).array('bestWorks', 8);

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

bestWorks.post('/uploadBestWorks',post, (req, res) => {
    console.log(req.body);
    console.log("helloooo");
    upload(req,res,(err)=>{
        if(err)
        {
            console.log(err);
            res.send({error:"img_only"})
        }
        else
        {
            console.log(req.files) 
            des_portfolio_model.find({id_user:req.body.id_user}).then((user)=>{
                let workArray = user[0].bestWorks;
                for (let i=0; i < req.files.length; i++) {
                    workArray.push(req.files[i]);
                }
                user[0].bestWorks = workArray;
                user[0].save();

                des_inspire.find().then((inspire_data)=>{
                    
                    if(inspire_data.length==0)
                    {
                        const new_inspire_data=des_inspire({
                            inspiration:req.files
                        })

                        new_inspire_data.save().then(()=>{
                            res.send({result:"success"})
                        }).catch(()=>{
                            console.log("error");
                        })
                    }
                    else
                    {
                        for(let i=0;i<req.files.length;i++)
                        {
                            inspire_data[0].inspiration.unshift(req.files[i]);
                        }

                        console.log(inspire_data[0]);

                        inspire_data[0].save().then(()=>{
                            res.send({result:"success"})
                        }).catch(()=>{
                            console.log("error");
                        })
                    }
                    
                }).catch((e)=>{
                    console.log(e);
                })
            }).catch(()=>{
                res.send({error:"tech_issue"})
            })
        }
    })
})

module.exports = bestWorks;