require('../db/mongoose')
const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const des_model=require('../models/des_model');
const nodemailer = require('nodemailer');


const post=bodyParser.urlencoded({extended:false});
const forgotpass = new express.Router();


forgotpass.post('/forgotpass',post, (req, res) =>{
    des_model.find({email: req.body.email}).then( (users) =>{
        if (users.length > 0 ){
            // send mail
            let transporter=nodemailer.createTransport({
                host:'smtp.gmail.com',
                port:587,
                secure:false,
                auth:{
                    user:'tribe.mailer.2020@gmail.com',
                    pass:'tribe_123@'
                },
                tls:{
                    rejectUnauthorized:false
                }
            });

            let mailOptions = {
                from: '"Hello" <tribe.mailer.2020@gmail.com>', 
                to: req.body.email,
                subject: 'Reset Tribe password',
                text: 'http://localhost:3000/resetpwd?token='+users[0].temporarytoken
            };

            transporter.sendMail(mailOptions,(error,info)=>{
                if(error){
                    return console.log(error);
                }
            })
            res.send({error:false});
        }
        else{
            res.send({error: true});
        }
    })
})

module.exports = forgotpass;