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
const rec_info = require('../models/rec_info');

const see_jobs=new express.Router();

const post=bodyParser.urlencoded({extended:false});

see_jobs.post("/see_jobs",post,(req,res)=>{
    console.log(req.body)

    const domain=req.body.domain

})

module.exports=see_jobs;