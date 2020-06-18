require('../db/mongoose')
const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt');
const request=require('request');
const hbs=require('hbs');
const jwt=require('jsonwebtoken');
const des_inspire=require('../models/des_inspire');
const des_portfolio_model=require('../models/des_portfolio_model');
const axios=require('axios');
const validator=require('validator');
const superagent=require('superagent');

const des_inspire_router=new express.Router();

const post=bodyParser.urlencoded({extended:false});

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

des_inspire_router.post("/inspiration",post,(req,res)=>{
    console.log(req.body.id_user)
    des_inspire.find().then((best_work)=>{
        console.log(best_work[0]);
        var best_work_array=best_work[0].inspiration;
        des_portfolio_model.find({id_user:req.body.id_user}).then((user_best_work)=>{
            var fil_best_work=[];
            const user_work=user_best_work[0].bestWorks;
            for(let i=0;i<user_work.length;i++)
            {
                for(let j=0;j<best_work_array.length;j++)
                {
                    if(user_work[i].filename==best_work_array[j].filename)
                    {
                        console.log("oonz");
                        best_work_array.splice(j, 1);                       
                    }
                }
            }
            
            const page=parseInt(req.body.page);

            const limit=parseInt(req.body.limit);

            const startIndex=(page-1)*limit;

            const endIndex=page*limit;

            let result=best_work_array.slice(startIndex,endIndex);
            console.log(result)
            result = shuffle(result)
            res.json(result);
        })
    })
})


module.exports=des_inspire_router;