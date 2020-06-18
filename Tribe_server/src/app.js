const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt');
const path=require('path');
const request=require('request');
const hbs=require('hbs');
const des_router=require('../routers/designer');
const dev_router=require('../routers/developer');
const verify=require('../routers/verification');
const forgotpass=require('../routers/forgotpass');
const reset=require('../routers/resetpass');
const bestWorks=require('../routers/bestWorks');
const upload_des_files=require('../routers/upload_des_files');
const upload_rec_files=require('../routers/upload_rec_files');
const github_auth=require('../routers/github_auth');
const job_post=require('../routers/job_post');
const des_inspire_router=require('../routers/des_inspire_router');
const cors=require("cors");
const multer = require('multer')
const recruit = require('../routers/recruiter');
const des_dashboard = require('../routers/des_dashboard');
const see_jobs = require('../routers/see_jobs');

const app=express();

const post=bodyParser.urlencoded({extended:false});

const seed=path.join(__dirname,"../public");
const views_path=path.join(__dirname,"../views");

app.use(bodyParser.json());
app.set("view engine","hbs");
app.set("views",views_path);
app.use(cors());
app.use(express.static(seed));
app.use(des_router);
app.use(upload_des_files);
app.use(upload_rec_files);
app.use(dev_router);
app.use(verify);
app.use(forgotpass);
app.use(bestWorks)
app.use(reset);
app.use(recruit);
app.use(github_auth);
app.use(des_inspire_router);
app.use(job_post);
app.use(des_dashboard);
app.use(see_jobs);

app.listen(9000,()=>{
    console.log("Server is on.");
})