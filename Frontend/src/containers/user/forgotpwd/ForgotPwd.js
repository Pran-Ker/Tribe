import React from "react";
import axios from "axios";
import Input from '../../../components/input/Input';

import tribelogo from '../../../images/tribelogo.png';
import './ForgotPwd.css';

class ForgotPwd extends React.Component{
    state={
        Email: {
            elementType : 'input',
            elementConfig : {
                placeholder : "Your Registered Email",
                type : 'email',
                required:true,
                name:"email",
            },
            value: '',
        }
    }

    onChangeHandler = (e) => {
        e.preventDefault()
        let {Email} = this.state
        Email.value = e.target.value;
        this.setState({Email})
    }

    onSubmitEmail=(e)=>{
        e.preventDefault();
        console.log(this.state.Email.value);
        const data={
            email:this.state.Email.value
        }
        axios.post('https://tribe-test-server-v1.herokuapp.com/forgotpass', data)
        .then(res => {
            if(res.error)
            {
                console.log("Email id not registered.")
            }
            else
            {
                console.log("Check your inbox for the entered email id and reset your password.")
            }
        })
    }

    render(){
        let {Email} = this.state
        return(
            <div className="ForgotPwd">
                <img src={tribelogo} className="User--Logo" />
                <form className="ForgotPwd--Form" onSubmit={this.onSubmitEmail}>
                    <h1 className="ForgotPwd--Title">Forgot Password</h1>
                    <Input
                        type = {Email.elementType}
                        elementConfig = {Email.elementConfig}
                        value = {Email.value}
                        changed = {(event => this.onChangeHandler(event))}
                    />
                    <button className="User--Button" type="submit">Submit</button>

                </form>
            </div>
        )
    }
}

export default ForgotPwd;