require('../db/mongoose')
const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const des_model=require('../models/des_model');
const rec_model=require('../models/rec_model');


const post=bodyParser.urlencoded({extended:false});
const verify = new express.Router();

verify.get('/verify', (req,res)=>{

    des_model.find({temporarytoken: req.query.token}).then((user) =>{
        if(user.length > 0)
        {
            console.log("Verified!");
            user[0].verified = true;
        
            //logoout functionality
            let token_array=user[0].tokens;
            
            if(token_array.length > 0){
                token_array = [];
                user[0].tokens = token_array; //logout of all devices
            }

            user[0].save();
            console.log(user[0]);
            res.redirect('http://localhost:3000/user');
        }
    }).catch((e) =>{
        console.log(e);
    });
    
})

verify.get('/verify_rec', (req,res)=>{

    rec_model.find({temporarytoken: req.query.token}).then((user) =>{
        if(user.length > 0)
        {
            console.log("Verified!");
            user[0].verified = true;
        
            //logoout functionality
            let token_array=user[0].tokens;
            
            if(token_array.length > 0){
                token_array = [];
                user[0].tokens = token_array; //logout of all devices
            }

            user[0].save();
            console.log(user[0]);
            res.redirect('http://localhost:3000/recuser');
        }
    }).catch((e) =>{
        console.log(e);
    });
    
})

module.exports = verify;
