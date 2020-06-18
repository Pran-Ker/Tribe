const recruit=require('express').Router();
const bcrypt=require('bcrypt');
const bodyParser=require('body-parser');
const jwt=require('jsonwebtoken');
const rec_model=require('../models/rec_model');
const rec_info=require('../models/rec_info');
const nodemailer = require('nodemailer');

recruit.use(bodyParser.urlencoded({
    extended: true
}));

recruit.post('/rec_signup', async (req, res) =>{
    console.log(req.body);
    try {
        let recr = await rec_model.findOne({email: req.body.email});
        console.log(recr)
        if(recr){
            res.send({error:"acc_exist"});
            return;
        }

        if(req.body.password.length<8)
        {
            res.send({error:"invalid_pwd_format"}); // Password must be 8 characters or more.
            return;
        }

        if(!(req.body.password===req.body.confirm_password))
        {
            res.send({error:"unequal_pwds"}); // The passwords don't match.
            return;
        }

        const hashed_password = bcrypt.hashSync(req.body.password,8);
        console.log(hashed_password)
        const new_rec = new rec_model({
            name: req.body.name,
            email: req.body.email,
            password: hashed_password,
            contactNum: req.body.conatc_num,
            tokens: [],
        });
        recr = await new_rec.save()
        console.log("New recruiter");
        const token_array = recr.tokens;
        const auth_token = jwt.sign({_id:recr._id},'tribe_vit');
        token_array.push(auth_token);
        recr.tokens=token_array;
        recr.temporarytoken=auth_token;
        console.log(recr)
        recr.save();
        recr=recr.toObject();

        const inf=new rec_info({
            id_user:recr._id
        });

        inf.save();

        console.log(recr)
        const rec_cred = {
            id_user:recr._id,
            name:recr.name,
            token:auth_token,
        }
        res.send(rec_cred);

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
            text: 'http://localhost:9000/verify_rec?token='+recr.temporarytoken
        };

        transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                return console.log(error);
            }
            console.log("okay bingo");
        })

       
        //mail functionality over
    } catch (e) {
        console.log(e)
        res.send({error: 'tech_issue'});
    };
});

recruit.post('/rec_login', async (req, res) => {
    try {
        const email =  req.body.email;
        let rec = await rec_model.findOne({email: email});
        if(!rec) {
            res.send({error: 'acc_dne'});
            return;
        }

        if(!bcrypt.compareSync(req.body.password, rec.password)){
            res.send({error: 'invalid_pwd'});
            return;
        }

        console.log('Recruiter logged-in');
        const auth_token=jwt.sign({_id:rec._id}, 'tribe_vit');
        
        const token_array = rec.tokens;
        token_array.push(auth_token);
        rec.tokens = token_array;
        rec.save();

        rec = rec.toObject();

        const rec_cred = {
            id_user: rec._id,
            name: rec.name,
            token: auth_token,
        }

        // res.send(rec_cred);

        rec_info.find({id_user:rec_cred.id_user}).then((user_pf)=>{
            console.log(user_pf);
            if(!user_pf[0].company_name)
            {
                console.log("not company name");
                rec_cred.login_check="company_name";
                res.send(rec_cred);
            }
            else if(!user_pf[0].company_about)
            {
                console.log("not company about");
                rec_cred.login_check="company_about";
                res.send(rec_cred);
            }
            else if(!user_pf[0].company_logo)
            {
                console.log("not company logo");
                rec_cred.login_check="company_logo";
                res.send(rec_cred);
            }
            else
            {
                console.log("right");
                rec_cred.login_check="recdashboard";
                res.send(rec_cred);
            }
        })

    } catch (e) {
        res.send({error: 'tech_issue'});
    };
});

recruit.post('/rec_info/:id',(req,res)=>{
    
    if(req.params.id=="name")
    {
        rec_info.find({id_user:req.body.id_user}).then((user)=>{
            user[0].company_name=req.body.company_name;
            user[0].save();
            res.send({result:"added"});
        }).catch(()=>{
            res.send({result:"tech_issue"}); // Technical issue
        });
    }
    else if(req.params.id=="about")
    {
        rec_info.find({id_user:req.body.id_user}).then((user)=>{
            user[0].company_about=req.body.company_about;
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

recruit.post("/auth_rec",(req,res)=>{
    if(req.body.token)
    {
        const current_token=req.body.token;
        rec_model.find({_id:req.body.id_user}).then((user)=>{
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
                    res.send({auth:"Granted", verified: verified});
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

recruit.post("/rec_profile",(req,res)=>{
    console.log(req.body);

    const id_user=req.body.id_user;

    rec_info.find({id_user:id_user}).then((profile)=>{
        const user_profile={
            company_logo:profile[0].company_logo,
            company_name:profile[0].company_name,
            company_about:profile[0].company_about
        }

        res.send(user_profile);
    }).catch(()=>{
        res.send({error:true,msg:"error"});
    })
})


module.exports = recruit;


