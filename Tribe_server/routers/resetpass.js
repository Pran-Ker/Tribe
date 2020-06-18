require('../db/mongoose')
const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const des_model=require('../models/des_model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


const post=bodyParser.urlencoded({extended:false});
const reset = new express.Router();


reset.post('/confirm_token',post,(req,res)=>{
    des_model.find({temporarytoken:req.body.temporarytoken}).then((user)=>{
        if(user.length==1)
        {
            res.send({error:false});
        }
        else
        {
            res.send({error:true});
        }
    })
})

reset.post('/resetpassword', (req, res) =>{
    
    des_model.find({temporarytoken: req.body.temporarytoken}).then((user) =>{
        
        if(user.length > 0){
            
            if(req.body.password.length<8)
            {
                
                return res.send({error:"invalid_pwd_format"}); // Password must be 8 characters or more.
            }
    
            if(!(req.body.password===req.body.confirm_password))
            {
                
                return res.send({error:"unequal_pwds"}); // The passwords don't match.
            }
            
            const hashed_password=bcrypt.hashSync(req.body.password,8);

            user[0].password = hashed_password;
            let token_array=user[0].tokens;
            if(token_array.length > 0){
                token_array = [];
                user[0].tokens = token_array; //logout of all devices
            }

            user[0].save();
            
            res.send({error:"success"});
        }
        else{
            res.send({error:"invalid_token"});
        }
    }).catch((e) =>{
        console.log(e);
    });
});

module.exports = reset;