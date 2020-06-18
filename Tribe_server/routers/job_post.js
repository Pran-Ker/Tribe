require('../db/mongoose')
const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt');
const request=require('request');
const hbs=require('hbs');
const jwt=require('jsonwebtoken');
const rec_model=require('../models/rec_model');
const rec_info=require('../models/rec_info');
const job_meeting=require('../models/job_meeting');
const github=require('../models/github');
const axios=require('axios');
const validator=require('validator');
const superagent=require('superagent');
const dev_tech = require('../models/dev_tech');

const job_post=new express.Router();

const post=bodyParser.urlencoded({extended:false});

job_post.post("/job_post",post,(req,res)=>{
    console.log(req.body);

    const position=req.body.position;
    const skills=req.body.skills;
    const desc=req.body.desc;
    const id_user=req.body.id_user;
    const time=new Date();

    rec_info.find({id_user:id_user}).then((company)=>{
        
        const new_job_post={
            company_name:company[0].company_name,
            position:position,
            skills:skills,
            desc:desc,
            time:time.getDate()+"/"+(parseInt(time.getUTCMonth())+1)+"/"+time.getFullYear()
        }

        company[0].job_posts.unshift(new_job_post);

        company[0].save().then(()=>{
            res.send(new_job_post);
        }).catch(()=>{
            res.send({error:true,msg:"error"});
        })
    })

})

job_post.post("/get_dashboard",post,(req,res)=>{

    //postings
    //meeting
    //logo
    //recommended candidates

    console.log(req.body);

    var dashboard={};

    const id_user=req.body.id_user;

    rec_info.find({id_user:id_user}).then((postings)=>{
        dashboard.job_posts=postings[0].job_posts;
        dashboard.logo=postings[0].company_logo;
        job_meeting.find({id_user:id_user}).then((meeting_data)=>{
            dashboard.meetings=meeting_data[0].meetings;
            res.send(dashboard);
        }).catch(()=>{
            res.send({error:true,msg:"error"})
        })
        
    }).catch((e)=>{
        console.log(e)
        res.send({error:true,msg:e});
    })

})

job_post.post("/get_postings",post,(req,res)=>{
    console.log(req.body);

    const id_user=req.body.id_user;

    rec_info.find({id_user:id_user}).then((postings)=>{
        res.send(postings[0].job_posts);
    }).catch(()=>{
        res.send({error:true,msg:"Error"})
    })
})

job_post.post("/meetings",post,(req,res)=>{
    console.log(req.body);

    const id_user=req.body.id_user;
    const candidate=req.body.candidate;
    const position=req.body.position;
    const time=req.body.time;

    const meeting_data={
        candidate:candidate,
        position:position,
        time:time
    }

    job_meeting.find({id_user:id_user}).then((meeting_datas)=>{

        if(meeting_datas.length==0)
        {
            const new_meeting_data=job_meeting({
                id_user:id_user,
                meetings:[meeting_data]
            })

            new_meeting_data.save().then(()=>{
                res.send(meeting_data);
            }).catch(()=>{
                res.send({error:true,msg:"error"});
            })
        }
        else
        {
            meeting_datas[0].meetings.push(meeting_data);
            meeting_datas[0].save().then(()=>{
                res.send(meeting_data);
            }).catch(()=>{
                res.send({error:true,msg:"Error"});
            })
        }
    })
})

job_post.post("/get_meetings",post,(req,res)=>{
    console.log(req.body)

    const id_user=req.body.id_user;

    job_meeting.find({id_user:id_user}).then((meeting_data)=>{
        res.send(meeting_data[0].meetings);
    }).catch(()=>{
        res.send({error:true,msg:"Error"});
    })
})

// job_post.post("/post_new_job",post,(req,res)=>{
//     console.log(req.body)

    
//     const position=req.body.position;
//     const skills=req.body.skills;

//     //find users based on position and skills

//     dev_tech.find({domain:position}).then((candidates)=>{
//         res.send(candidates);
//     }).catch((e)=>{
//         res.send(e)
//     })

// })


/*********************************************************************************************/
/*********************************************************************************************/
/*********************************************************************************************/
/***************************************  TESTING PURPOSE  ****************************************/

job_post.post("/get_candidates",post,(req,res)=>{
    console.log(req.body)

    const position=req.body.position;
    const skills=req.body.skills;

    //find users based on position and skills

    dev_tech.find({domain:position}).then((candidates)=>{
        console.log(candidates)

        let i,j,k;

        const best_cand=[];

        for(i=0;i<candidates.length;i++)
        {
            const curr_cand=candidates[i];
            const id_user=curr_cand.id_user;
            const cand_skills=curr_cand.skills;

            github.find({id_user:id_user}).then((dev)=>{
                console.log(dev)

                const git_score=dev[0].git_score;

                let count=0;

                for(j=0;j<skills.length;j++)
                {
                    for(k=0;k<cand_skills.length;k++)
                    {
                        if(skills[j]==cand_skills[k])
                        {
                            count++;
                            break;
                        }
                    }
                }

                const final_score=parseFloat(git_score)+count;
                
                best_cand.push([curr_cand,final_score]);
                
            })
        }

        setTimeout(()=>{
            console.log("hello")
            best_cand.sort(function(a,b){
                return b[1]-a[1];
            })
            let final_cand=[]
            for(i=0;i<best_cand.length;i++)
            {
                final_cand.push(best_cand[i][0])
            }
            console.log(best_cand)
            res.send(final_cand)
        },1000);


    }).catch((e)=>{
        res.send(e)
    })

})


module.exports=job_post;