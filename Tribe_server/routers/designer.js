// Designer routes

require('../db/mongoose')
const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt');
const request=require('request');
const hbs=require('hbs');
const jwt=require('jsonwebtoken');
const des_model=require('../models/des_model');
const des_portfolio_model=require('../models/des_portfolio_model');
const axios=require('axios');
const validator=require('validator');
const nodemailer = require('nodemailer');

const des_router=new express.Router();

const post=bodyParser.urlencoded({extended:false});


//Signup

des_router.post("/signup_post",post,(req,res)=>{


    des_model.find({email:req.body.email}).then((designers)=>{
        if(designers.length>0)
        {
            return res.send({error:"acc_exist"}); // Account already exist.
        }

        if(req.body.password.length<8)
        {
            return res.send({error:"invalid_pwd_format"}); // Password must be 8 characters or more.
        }

        if(!(req.body.password===req.body.confirm_password))
        {
            return res.send({error:"unequal_pwds"}); // The passwords don't match.
        }

        const hashed_password=bcrypt.hashSync(req.body.password,8);

        const new_des=new des_model({
            name:req.body.name,
            email:req.body.email,
            password:hashed_password,
            tokens:[],
            verified:false,
        });

        new_des.save().then((des)=>{
            console.log("New designer!");
            const token_array=des.tokens;
            const auth_token=jwt.sign({_id:des._id},"tribe_vit");
            token_array.push(auth_token);
            des.tokens=token_array;
            des.temporarytoken = auth_token
            des.save();

            const pf=new des_portfolio_model({
                id_user:des._id
            });

            pf.save().then(()=>{

                des=des.toObject();
                const des_cred={
                    id_user:des._id,
                    name:des.name,
                    token:auth_token,
                    verified: false
                }
                console.log(des);

                delete des.password;
                delete des.tokens;

                //sending mail

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
                    subject: 'Nodemailer - Test',
                    text: 'http://localhost:9000/verify?token='+des.temporarytoken
                };

                transporter.sendMail(mailOptions,(error,info)=>{
                    if(error){
                        return console.log(error);
                    }
                    console.log("okay bingo");
                })

                res.send(des_cred);

            });
            
            //mail functionality over
            
        }).catch((e)=>{
            res.send({error:"tech_issue"}); // Technical / Server issue
        });


    }).catch(()=>{
        res.send({error:"tech_issue"}); // Technical / Server issue
    })
        
});

//Designation

des_router.post("/des_desg",post,(req,res)=>{
    des_model.find({_id:req.body.id_user}).then((user)=>{
        user[0].designation=req.body.designation;
        user[0].save();
        res.send({result:"success"});
    }).catch(()=>{
        res.send({error:"tech_issue"});
    })
})


//Domain

des_router.post("/des_domain",post,(req,res)=>{
    if(validator.isURL(req.body.domain))
    {
        des_model.find({_id:req.body.id_user}).then((user)=>{
            user[0].domain=req.body.domain;
            user[0].save();
            res.send({result:"success"});
        }).catch(()=>{
            res.send({error:"tech_issue"});
        })
    }
    else
    {
        res.send({error:"inv_url"})
    }
    
})


// Login

des_router.post("/login_post",post,(req,res)=>{
    const email=req.body.email;
    let ver = false;
    console.log("fxn start");
    des_model.find({email:email}).then((user)=>{
        if(user.length==0)
        {
            console.log("something wrong1")
            return res.send({error:"acc_dne"}); // Account does not exit.
        }

        if(!bcrypt.compareSync(req.body.password,user[0].password))
        {
            console.log("something wrong2")
            return res.send({error:"invalid_pwd"});  // Invalid password.
        }

        console.log("Designer "+email+" Logged in.");

        const auth_token=jwt.sign({_id:user[0]._id},"tribe_vit");
        const token_array=user[0].tokens;
        token_array.push(auth_token);
        user[0].tokens=token_array;

        user[0].save().then(()=>{
            ver = user[0].verified

            user[0]=user[0].toObject();

            const user_cred={
                id_user:user[0]._id,
                name:user[0].name,
                token:auth_token,
                verified: ver,
                designation:user[0].designation
            }
                
            delete user[0].password;
            delete user[0].tokens;

            des_portfolio_model.find({id_user:user_cred.id_user}).then((user_pf)=>{
                console.log(user_cred);
                console.log(user[0]);
                console.log("something wrong3")
                if(!user[0].designation)
                {
                    console.log("something wrong4")
                    console.log("not des");
                    user_cred.login_check="designation";
                    console.log(user_cred)
                }
                else if(!user_pf[0].about)
                {
                    console.log("something wrong4")
                    console.log("not about");
                    user_cred.login_check="about";
                
                }
                else if(user_pf[0].social.length==0)
                {
                    console.log("not social");
                    user_cred.login_check="socialmedia";
                
                }
                else if(user_pf[0].skills.length==0)
                {
                    console.log("not skills");
                    user_cred.login_check="skills";
                    
                }
                else if(!user_pf[0].pic)
                {
                    console.log("not pic");
                    user_cred.login_check="pic";
                    
                }
                else
                {
                    console.log("right");
                    user_cred.login_check="bestwork";
                    
                }
                res.send(user_cred)
            })
        });

  
    }).catch((e)=>{
        res.send({error:"tech_issue"}); // Technical issue
    })

});


//Logout

des_router.post("/logout",post,(req,res)=>{
    const this_token=req.body.token;
    const id_user=req.body.id_user;
    des_model.find({_id:id_user}).then((user)=>{
        const token_array=user[0].tokens;
        const filter_token_array=[];
        var i;
        for(i=0;i<token_array.length;i++)
        {
            if(token_array[i]!=this_token)
            {
                filter_token_array.push(token_array[i]);
            }
        }
        user[0].tokens=filter_token_array;
        user[0].save();
        console.log(user[0]);
        res.send({ok:"ok"});
    }).catch((e)=>{
        res.send({ok:"ok2"});
    })
})


// Designer portfolio

des_router.post('/userpf/:id',(req,res)=>{
    
    if(req.params.id=="about")
    {
        des_portfolio_model.find({id_user:req.body.id_user}).then((user)=>{
            user[0].about=req.body.about;
            user[0].save();
            res.send({result:"added"});
        }).catch(()=>{
            res.send({result:"tech_issue"}); // Technical issue
        });
    }
    else if(req.params.id=="socialmedia")
    {
        des_portfolio_model.find({id_user:req.body.id_user}).then((user)=>{
            user[0].social=req.body.social;
            user[0].save();
            res.send({result:"added"});
        }).catch(()=>{
            res.send({result:"tech_issue"}); // Technical issue
        });
    }
    else if(req.params.id=="skills")
    {
        des_portfolio_model.find({id_user:req.body.id_user}).then((user)=>{
            user[0].skills=req.body.skills;
            user[0].save();
            res.send({result:"added"});
        }).catch(()=>{
            res.send({result:"tech_issue"}); // Technical issue
        });
    }
    else
    {
        res.send({error:"error404"}); // Error 404 page not found.
    }
});


// Session authorization of a user.

des_router.post("/auth",post,(req,res)=>{
    if(req.body.token)
    {
        const current_token=req.body.token;
        des_model.find({_id:req.body.id_user}).then((user)=>{
            if(user.length>0)
            {   
                const verified = user[0].verified;
                const token_array=user[0].tokens;
                const designation=user[0].designation;
                var i,flag=0;
                console.log(token_array)
                for(i=0;i<token_array.length;i++)
                {
                    if(current_token==token_array[i])
                    {
                        flag=1;
                        break;
                    }
                }

                if(flag==1)
                {
                    res.send({auth:"Granted", verified: verified, designation:designation});
                    console.log(designation)
                }
                else
                {
                    console.log(flag);
                    res.send({auth:"NotGranted"});
                }
            }
            else
            {
                console.log(user.length);
                res.send({auth:"NotGranted"});
            }

        }).catch((e)=>{
            res.send({auth:"ServerError"})
        })
    }
    else
    {
        res.send({auth:"NoSessions"});
    }
})


//Get user data
des_router.post("/user_data",post,(req,res)=>{
    des_model.find({_id:req.body.id_user}).then((user)=>{
        var user_data={
            name:user[0].name,
            email:user[0].email,
            designation:user[0].designation
        };
        des_portfolio_model.find({id_user:user[0]._id}).then((user_pf)=>{
            user_data.pf_data={
                social:user_pf[0].social,
                about:user_pf[0].about,
                skills:user_pf[0].skills,
                logo:user_pf[0].logo,
                pic:user_pf[0].pic
            }
            console.log(user_data);
            res.send(user_data);
        })
    })   
})

module.exports=des_router;
