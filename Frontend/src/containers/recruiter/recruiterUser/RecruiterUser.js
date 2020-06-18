import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import axios from 'axios'
import ReCAPTCHA from "react-google-recaptcha";
import {authDetails} from '../../../redux/auth/auth-action';
import {recLoginForm, recSignupForm, signupForm, loginForm} from '../../../redux/navigation/navigation-action';
import Input from '../../../components/input/Input';

import tribelogo from '../../../images/tribelogo.png';
import './RecruiterUser.css';

class RecruiterUser extends React.Component{

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
            Designation: {
                elementType : 'input',
                elementConfig : {
                    placeholder : "Your Designation",
                    type : 'text',
                    required:true,
                    name:"name",
                },
                value: '',
            },
            Email : {
                elementType : 'input',
                elementConfig : {
                    placeholder : "Work Email",
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
            },
            ContactNum : {
                elementType: 'input',
                elementConfig : {
                    placeholder : "Contact Number",
                    type : 'text',
                    required:true,
                    name:"contact_num",
                },
                value: '',
            }
        },
        loginform:{
            Email : {
                elementType : 'input',
                elementConfig : {
                    placeholder : "Work Email",
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
        }
    }

    onUserHandler = (type) => {
        let {userLoginFormFuntion, userSignupFormFuntion} = this.props;
        if(type === "login"){
            userLoginFormFuntion()
        }
        else{
            userSignupFormFuntion()
        }
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

    onSignupSubmit=(e)=>{
        e.preventDefault()
        console.log(this.props)
        let {authFunction} = this.props;
        let {Name,Email,Password,ConfirmPassword, ContactNum, Designation} = this.state.signupform;

        const data={
            name:Name.value,
            email:Email.value,
            password:Password.value,
            confirm_password:ConfirmPassword.value,
            conatc_num: ContactNum.value,
            desg:Designation.value
        }

        console.log(data)

        axios.post('https://tribe-test-server-v1.herokuapp.com/rec_signup', data)
            .then(res => {
                console.log(res.data)
                authFunction(res.data);
                if(res.data.error!=undefined)
                {
                    this.props.history.push({
                        pathname: '/user',
                    })
                }
                else
                {
                    console.log("Success: signup"); // redirect to next page!
                    this.props.history.push({
                        pathname: '/recinfo',
                    })
                }
        })   
    }

    onLoginSubmit=(e)=>{
        e.preventDefault()

        let {authFunction} = this.props;
        let {Email,Password} = this.state.loginform;

        const data={
            email:Email.value,
            password:Password.value,
        }

        console.log(data)

        axios.post('https://tribe-test-server-v1.herokuapp.com/rec_login', data)
            .then(res => {
                console.log(res.data)
                authFunction(res.data);
                if(res.data.error!=undefined)
                {
                    this.props.history.push({
                        pathname: '/user',
                    })
                }
                else
                {
                    console.log("Success: Login"); // redirect to next page!
                    console.log(res.data.login_check)
                    if(res.data.login_check=="company_name")
                    {
                        this.props.history.push({
                            pathname: '/recinfo',
                        })
                    }
                    else if(res.data.login_check=="company_about")
                    {
                        this.props.history.push({
                            pathname: '/recinfo/about',
                        })
                    }
                    else if(res.data.login_check=="company_logo")
                    {
                        this.props.history.push({
                            pathname: '/recinfo/logo',
                        })
                    }
                    else
                    {
                        this.props.history.push({
                            pathname: '/recdashboard',
                        })
                    }
                    //redirect user to the question they have not yet answered
                }
        })   
    }
    

    render(){
        let {form} = this.props;
        let content;

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

        if(form["login"] == true){
            content = <div className="RecruiterUser--Login">
                <h1 className="RecruiterUser--Title">Company Login</h1>
                <h2 className="RecruiterUser--Subtitle">Not Registered? <a className="User--Changeform" onClick={e => this.changeFormHandler(e,"signup")}>Sign Up</a></h2>
                <form className="RecruiterUser--LoginForm" onSubmit={this.onLoginSubmit}>
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
                    <div className="RecruiterUser--LoginLinks">
                        <Link className="RecruiterUser--ForgotPwd" to="/user" onClick={this.onUserHandler("login")}>User Login</Link>
                        <Link className="RecruiterUser--ForgotPwd" to="/forgotpwd">Forgot Password?</Link>
                    </div>
                    <button className="RecruiterUser--Button" type="submit" onSubmit={() => { recaptchaRef.current.execute(); }}>Login</button>
                </form>
            </div>
        }
        else{
            content = <div className="RecruiterUser--Signup">
                <h1 className="RecruiterUser--Title">Company Sign Up</h1>
                <h2 className="RecruiterUser--Subtitle">Part Of A Team? <a className="User--Changeform" onClick={e => this.changeFormHandler(e,"login")}>Login</a></h2>
                <form className="RecruiterUser--SignupForm" onSubmit={this.onSignupSubmit}>
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
                    <Link className="RecruiterUser--Company" to="/user" onClick={this.onUserHandler('signup')}>Sign Up as User?</Link>
                    <button className="RecruiterUser--Button" type="submit"  onSubmit={() => { recaptchaRef.current.execute(); }}>Sign Up</button>
                </form>
                <h3 className="RecruiterUser--Terms">* By signing up, you agree to our Terms of Use and to receive Tribe emails & updates and acknowledge that you read our Privacy Policy.</h3>
            </div>
        }
        return(
            <div className="RecruiterUser">
                <Link to="/"><img src={tribelogo} className="RecruiterUser--Logo" /></Link>
                {content}
                <ReCAPTCHA
                        sitekey="6LegsgEVAAAAAAnFCwOREyz4Lw9lENAKBoNOZb9K"
                        theme = "dark"
                        ref={recaptchaRef}
                        size="invisible"
                    />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    form: state.nav.recFormDisplay
})

const mapDispatchToProps = dispatch => ({
    authFunction: data => dispatch(authDetails(data)),
    loginFormFunction: () => dispatch(recLoginForm()),
    signupFormFunction: () => dispatch(recSignupForm()),
    userSignupFormFuntion: () => dispatch(signupForm()),
    userLoginFormFuntion: () => dispatch(loginForm())
})

export default connect(mapStateToProps, mapDispatchToProps)(RecruiterUser);