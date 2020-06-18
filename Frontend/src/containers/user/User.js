import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";

import {authDetails} from '../../redux/auth/auth-action';
import {loginForm, signupForm, recSignupForm, recLoginForm} from '../../redux/navigation/navigation-action';
import {userDesignation} from '../../redux/user/user-action'
import Input from '../../components/input/Input';

import tribelogo from '../../images/tribelogo.png';
import './User.css';


class User extends Component{
    state = {
        signupform:{
            Name : {
                elementType : 'input',
                elementConfig : {
                    placeholder : "Your Name",
                    type : 'text',
                    required:true,
                    name:"name",
                },
                value: '',
            },
            Email : {
                elementType : 'input',
                elementConfig : {
                    placeholder : "Your Email",
                    type : 'email',
                    required:true,
                    name:"email",
                },
                value: '',
            },
            Password : {
                elementType : 'input',
                elementConfig : {
                    placeholder : "Password",
                    type : 'password',
                    required:true,
                    name:"password",
                },
                value: '',
            },
            ConfirmPassword : {
                elementType : 'input',
                elementConfig : {
                    placeholder : "Re-enter Password",
                    type : 'password',
                    required:true,
                    name:"confirm_password",
                },
                value: '',
            }
        },
        loginform:{
            Email : {
                elementType : 'input',
                elementConfig : {
                    placeholder : "Your Email",
                    type : 'email',
                    required:true,
                    name:"email",
                },
                value: '',
            },
            Password : {
                elementType : 'input',
                elementConfig : {
                    placeholder : "Password",
                    type : 'password',
                    required:true,
                    name:"password",
                },
                value: '',
            }
        },
        msgsignup: '',
        msglogin: '',
    }

    changeFormHandler = (event,type) => {
        event.preventDefault()
        let {loginFormFunction, signupFormFunction} = this.props;
        if(type === "login"){
            loginFormFunction()
        }
        else{
            signupFormFunction()
        }
    }

    onChangeHandler = (event, type, form) => {
        let userInputData;
        if(form==="signup"){
            userInputData = {...this.state.signupform}
        }
        else if(form==="login"){
            userInputData = {...this.state.loginform}
        }
        let userInput = userInputData[type];
        userInput.value = event.target.value;
        userInputData[type] = userInput;
        if(form==="signup"){
            this.setState({signupform: userInputData})
        }
        else if(form==="login"){
            this.setState({loginform: userInputData})
        }
    }

    onSubmit=(e)=>{

        this.setState({msgsignup: 'Signing you up! Just a moment...'})
        e.preventDefault()

        let {authFunction} = this.props;
        let {Name,Email,Password,ConfirmPassword} = this.state.signupform;

        const data={
            name:Name.value,
            email:Email.value,
            password:Password.value,
            confirm_password:ConfirmPassword.value
        }

        axios.post('https://tribe-test-server-v1.herokuapp.com/signup_post', data)
            .then(res => {
                authFunction(res.data);
                if(res.data.error!=undefined)
                {
                    this.props.history.push({
                        pathname: '/user',
                    })
                }
                else
                {
                    this.props.history.push({
                        pathname: '/choice',
                    })

                }
        })   
    }

    onSubmitLogin=(e)=>{
        let {authFunction, userDesignationFunction} = this.props;
        let {Email,Password} = this.state.loginform
        e.preventDefault();
        this.setState({msglogin: 'Signing you up! Just a moment...'})

        const data={
            email:Email.value,
            password:Password.value
        }

        axios.post('https://tribe-test-server-v1.herokuapp.com/login_post', data)
            .then(res => {
                console.log(res.data)
                authFunction(res.data);
                userDesignationFunction(res.data.designation)
                if(res.data.error!=undefined)
                {

                    this.props.history.push({
                        pathname: '/user',
                    })
                }
                else
                {
                    console.log(res.data);  
                    if(res.data.login_check=="designation")
                    {
    
                        this.props.history.push({
                            pathname: '/choice',
                        })
                    }
                    else if(res.data.login_check=="about")
                    {
    
                        this.props.history.push({
                            pathname: '/userinfo',
                        })
                    }
                    else if(res.data.login_check=="socialmedia")
                    {
    
                        this.props.history.push({
                            pathname: '/userinfo/socialmedia',
                        })
                    }
                    else if(res.data.login_check=="skills")
                    {
    
                        this.props.history.push({
                            pathname: '/userinfo/skills',
                        })
                    }
                    else if(res.data.login_check=="pic")
                    {
    
                        this.props.history.push({
                            pathname: '/userinfo/pic',
                        })
                    }
                    else if(res.data.login_check=="bestwork")
                    {
                        this.props.history.push({
                            pathname: '/bestwork',
                        })
                    }
                }
        })   
    }

    onRecruiterHandler = (type) => {
        let {recLoginFormFunction, recSignupFormFunction} = this.props;
        if(type === "login"){
            recLoginFormFunction()
        }
        else{
            recSignupFormFunction()
        }

    }

    handleCaptchaResponseChange(response) {
        this.setState({
          recaptchaResponse: response,
        });
      }

    render(){
        let content;
        let {msglogin, msgsignup} = this.state;
        msglogin = ""
        msgsignup = ""
        let {auth,form} = this.props
        if(typeof auth !== 'undefined')
        {
            if(auth.error === "acc_dne"){
                msglogin = "Please signup before login"
            }
            else if(auth.error === "invalid_pwd"){
                msglogin = "Wrong Password! Please enter the correct password"
            }
            else if(auth.error === "invalid_pwd_format"){
                msgsignup = "Password must be 8 characters"
            }
            else if(auth.error === "unequal_pwds"){
                msgsignup = "Passwords do not match!"
            }
            else if(auth.error === "invalid_pwd"){
                msgsignup = "Invalid Password"
            }
            else if(auth.error === "acc_exist"){
                msgsignup = "Email already in use"
            }
            else if(auth.error==="logged_out" || auth.error==="_")
            {
                msgsignup="";
            }
        }
        
        let signupform = [];
        for(let element in this.state.signupform){
            signupform.push({
                key : element,
                config : this.state.signupform[element]
            })
        }

        let loginform = [];
        for(let element in this.state.loginform){
            loginform.push({
                key : element,
                config : this.state.loginform[element]
            })
        }

        const recaptchaRef = React.createRef();

        if(form["signup"] == true){ 
            content = <div className="User--Signup">
                <h1 className="User--Title">Sign Up</h1>
                <h2 className="User--Subtitle">Already Registered? <a className="User--Changeform" onClick={e => this.changeFormHandler(e,"login")}>Login</a></h2>
                <form className="User--SignupForm" onSubmit={this.onSubmit}>
                    {
                        signupform.map(element => (
                            <Input
                                key = {element.key}
                                type = {element.config.elementType}
                                elementConfig = {element.config.elementConfig}
                                value = {element.config.value}
                                changed = {(event => this.onChangeHandler(event, element.key, "signup"))}
                            />
                        ))
                    }
                    <Link className="User--Company" to="/recuser" onClick={this.onRecruiterHandler("signup")}>Register as a Company?</Link>
                    <h1 className="User--ErrorMsg">{msgsignup}</h1>
                    <button className="User--Button" type="submit" onSubmit={() => { recaptchaRef.current.execute(); }}>Sign Up</button>
                </form>
                <h3 className="User--Terms">* By signing up, you agree to our Terms of Use and to receive Tribe emails & updates and acknowledge that you read our Privacy Policy.</h3>
            </div>
        }

        else if(form["login"] == true){
            content = <div className="User--Login">
                <h1 className="User--Title">Login</h1>
                <h2 className="User--Subtitle">New to tribe? <a className="User--Changeform" onClick={e => this.changeFormHandler(e,"signup")}>Sign Up</a></h2>
                <form className="User--LoginForm" onSubmit={this.onSubmitLogin}>
                    {
                        loginform.map(element => (
                            <Input
                                key = {element.key}
                                type = {element.config.elementType}
                                elementConfig = {element.config.elementConfig}
                                value = {element.config.value}
                                changed = {(event => this.onChangeHandler(event, element.key, "login"))}
                            />
                        ))
                    }
                    <div className="User--LoginLinks">
                        <Link className="User--ForgotPwd" to="/recuser" onClick={this.onRecruiterHandler("login")}>Company Login</Link>
                        <Link className="User--ForgotPwd" to="/forgotpwd">Forgot Password?</Link>
                    </div>
                    <h1 className="User--ErrorMsg">{msglogin}</h1>
                    <button className="User--Button" type="submit"  onSubmit={() => { recaptchaRef.current.execute(); }}>Login</button>
                </form>
        </div>
        }


        return(
            <div className="User">
                <Link to="/"><img src={tribelogo} className="User--Logo" /></Link>
                <ReCAPTCHA
                        sitekey="6LegsgEVAAAAAAnFCwOREyz4Lw9lENAKBoNOZb9K"
                        theme = "dark"
                        ref={recaptchaRef}
                        size="invisible"
                        onChange={this.handleCaptchaResponseChange}
                    />
                {content}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth.auth,
    form: state.nav.formDisplay
})

const mapDispatchToProps = dispatch => ({
    authFunction: data => dispatch(authDetails(data)),
    userDesignationFunction: data => dispatch(userDesignation(data)),
    loginFormFunction: () => dispatch(loginForm()),
    signupFormFunction: () => dispatch(signupForm()),
    recLoginFormFunction: () => dispatch(recLoginForm()),
    recSignupFormFunction: () => dispatch(recSignupForm())
})


export default connect(mapStateToProps,mapDispatchToProps)(User);
