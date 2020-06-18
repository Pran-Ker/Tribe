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
const github_data=require('../models/github');
const axios=require('axios');
const validator=require('validator');
const dev_tech = require('../models/dev_tech');

const dev_router=new express.Router();

const post=bodyParser.urlencoded({extended:false});

//Designation

dev_router.post("/dev_desg",post,(req,res)=>{
    des_model.find({_id:req.body.id_user}).then((user)=>{
        user[0].designation=req.body.designation;
        user[0].save();
        res.send({result:"success"});
    }).catch(()=>{
        res.send({error:"tech_issue"});
    })
})

//Domain

dev_router.post("/dev_domain",post,(req,res)=>{
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

//Github data

dev_router.post("/github_data",post,(req,res)=>{
    console.log(req.body);
    console.log("amigios my feen");
    github_data.find({id_user:req.body.id_user}).then((users)=>{
        if(users.length>0)
        {
            return res.send({error:true,message:"Github data for this user already exists."});
        }

        const new_github_data=new github_data({
            id_user:req.body.id_user,
            login:req.body.github_data.login,
            avatar_url:req.body.github_data.avatar_url,
            email:req.body.github_data.email,
            location:req.body.github_data.location,
            bio:req.body.github_data.bio,
            public_repos:req.body.github_data.public_repos,
            followers:req.body.github_data.followers,
            following:req.body.github_data.following,
            repos_data:req.body.github_data.repos_data,
        });

        new_github_data.save().then(()=>{
            res.send({error:false,message:"Added"});
        }).catch((e)=>{
            console.log(e);
            res.send({error:true,message:e});
        })

    }).catch((e)=>{
        console.log(e);
        res.send({error:true,message:e});
    })
})

dev_router.post("/domain_specs",post,(req,res)=>{
    console.log(req.body);

    const id_user=req.body.id_user
    const domain=req.body.domain
    const skills=req.body.skills
    const name=req.body.name
    const email=req.body.email

    //store the id user and skills in each domain collection
    let i,j;

    for(i=0;i<domain.length;i++)
    {
        const curr_domain=domain[i];
        const curr_skills=skills[i];

        const new_data=dev_tech({
            domain:curr_domain,
            skills:curr_skills,
            id_user:id_user,
            name:name,
            email:email
        })

        new_data.save().then((new_res)=>{
            console.log(new_res)
        }).catch((e)=>{
            return res.send(e)
        })
    }

})

/*********************************************************************************************/
/*********************************************************************************************/
/*********************************************************************************************/
/***************************************  TESTING PURPOSE  ****************************************/




module.exports=dev_router;