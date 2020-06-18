import React from "react";
import queryString from 'query-string'
import Input from '../../../components/input/Input';
import axios from "axios";
import tribelogo from '../../../images/tribelogo.png';
import './ResetPwd.css';

class ResetPwd extends React.Component{
    state={
        NewPassword : {
            elementType : 'input',
            elementConfig : {
                placeholder : "New Password",
                type : 'password',
                required:true,
                name:"new_password",
            },
            value: '',
        },
        ConfirmPassword : {
            elementType : 'input',
            elementConfig : {
                placeholder : "Confirm Password",
                type : 'password',
                required:true,
                name:"confirm_password",
            },
            value: '',
        }
    }

    componentDidMount(){
        const value=queryString.parse(this.props.location.search);
        const token=value.token;
        const data={
            temporarytoken:token
        };
        axios.post('https://tribe-test-server-v1.herokuapp.com/confirm_token', data)
            .then(res => {
                if(res.data.error)
                {
                    this.props.history.push({
                        pathname: '/user',
                    })
                }
        })  
    }

    onChangeHandler = (e, type) => {
        e.preventDefault()
        if(type === "new"){
            let {NewPassword} = this.state
            NewPassword.value = e.target.value
            this.setState({NewPassword})
        }
        else{
            let {ConfirmPassword} = this.state
            ConfirmPassword.value = e.target.value
            this.setState({ConfirmPassword})
        }
    }

    onSubmitPwd=(e)=>{
        e.preventDefault();
        const value=queryString.parse(this.props.location.search);
        const token=value.token;
        const data={
            password:this.state.NewPassword.value,
            confirm_password:this.state.ConfirmPassword.value,
            temporarytoken:token
        }
        console.log(data);
        axios.post('https://tribe-test-server-v1.herokuapp.com/resetpassword', data)
            .then(res => {
                if(res.data.error=="invalid_pwd_format")
                {
                    console.log("invalid_pwd_format");
                }
                else if(res.data.error=="unequal_pwds")
                {
                    console.log("unequal_pwds");
                }
                else if(res.data.error=="invalid_token")
                {
                    console.log("invalid_token");
                }
                else if(res.data.error=="success")
                {
                    this.props.history.push({
                        pathname: '/user'
                    })
                } 
        }) 
    }

    render(){

        let {NewPassword, ConfirmPassword} = this.state

        return(
            <div className="ResetPwd">
                <img src={tribelogo} className="User--Logo" />
                <form className="ResetPwd--Form" onSubmit={this.onSubmitPwd}>
                <h1 className="ResetPwd--Title">Reset Password</h1>
                    <Input
                        type = {NewPassword.elementType}
                        elementConfig = {NewPassword.elementConfig}
                        value = {NewPassword.value}
                        changed = {(event => this.onChangeHandler(event, "new"))}
                    />
                    <Input
                        type = {ConfirmPassword.elementType}
                        elementConfig = {ConfirmPassword.elementConfig}
                        value = {ConfirmPassword.value}
                        changed = {(event => this.onChangeHandler(event, "confirm"))}
                    />
                    <button className="User--Button" type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default ResetPwd;