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
const superagent=require('superagent');

const github_auth=new express.Router();

const post=bodyParser.urlencoded({extended:false});

github_auth.post('/oauth',post,(req,res)=>{
    console.log(req.body);
    const id_user=req.body.id_user;
    superagent
        .post('https://github.com/login/oauth/access_token')
        .send({ 
            client_id: req.body.client_id, 
            client_secret: req.body.secret_id,
            code:req.body.code 
        })
        .set('Accept', 'application/json')
        .then((result) => {
            console.log(result.body);
            const access_token=result.body.access_token;
            console.log(access_token);
            superagent
                .get('https://api.github.com/user')
                .set({
                    'Authorization':'token '+access_token,
                    'User-Agent':'SaranshM'
                })
                .then((resultx)=>{
                    console.log(resultx.body);
                    var github_data_db={};
                    github_data_db.login=resultx.body.login;
                    const repos_url=resultx.body.repos_url;
                    superagent
                        .get(repos_url)
                        .set('User-Agent','SaranshM')
                        .then((repos)=>{
                            const repos_array=repos.body;
                            var repos_data=[];
                            var i;
                            for(i=0;i<repos_array.length;i++)
                            {
                                repos_data.push(repos_array[i].name);
                            }
                            console.log(repos_data);
                            github_data_db.repos_data=repos_data;
                            console.log(github_data_db);

                            github_data.find({id_user:id_user}).then((prof)=>{
                                if(prof.length==0)
                                {
                                    const new_github_data=new github_data({
                                        id_user:id_user,
                                        login:github_data_db.login,
                                        repos_data:github_data_db.repos_data,
                                        access_token:access_token
                                    });
        
                                    new_github_data.save().then(()=>{
                                        // res.send({error:false,message:"Added"});
                                        console.log("Added");
                                        delete github_data_db.access_token;
                                        res.send(github_data_db);
                                    }).catch((e)=>{
                                        console.log(e);
                                        // res.send({error:true,message:e});
                                    })
                                }
                                else
                                {
                                    const user_github=prof[0];
                                    delete user_github.access_token;
                                    res.send(user_github)
                                }
                            }).catch(()=>{
                                res.send({error:true})
                            })

                        }).catch((e)=>{
                            console.log(e);
                        })
                }).catch((e)=>{
                    console.log(e);
                })
        });
})

github_auth.post("/gitreps",post,(req,res)=>{
    console.log(req.body);
    console.log("heloooooooo")
    github_data.find({id_user:req.body.id_user}).then((datas)=>{
        console.log(datas)
        res.send({
            username:datas[0].login,
            password:datas[0].access_token
        })
    })

})

github_auth.post("/git_score",post,(req,res)=>{
    console.log(req.body);
    github_data.find({id_user:req.body.id_user}).then((data)=>{
        data[0].git_score=req.body.git_score;
        data[0].save();
        res.send({error:false,git_score:req.body.git_score});
    }).catch(()=>{
        res.send({error:true,message:"Tech issue"})
    })
})

module.exports=github_auth;