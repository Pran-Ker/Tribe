import React from "react";
import {connect} from "react-redux";
import axios from "axios";

import {authDetails} from '../../../../../redux/auth/auth-action';
import auth_rec from '../../../../../auth/auth_rec';
import Input from '../../../../../components/input/Input';

class RecAbout extends React.Component{

    state = {
        About: {
            elementType : 'textarea',
            elementConfig : {
                placeholder : 'Description',
                cols: '50',
                rows: '3',
                name:"about",
                required:true
            },
            value: '',
        }
    }

    componentDidMount() {
        let {auth, authFunction} = this.props;
        console.log(this.props.auth);
        if(this.props.auth.error=="logged_out")
        {
            authFunction({error:"logged_out"})
            return this.props.history.push({
                pathname: '/user'
            })
        }
        const result=auth_rec(this.props.auth);
        result.then((res)=>{
            console.log(res);
            if(res.auth=="denied")
            {
                authFunction(res)
                this.props.history.push({
                    pathname: '/user',
                })
            }
        })
    }

    onChangeHandler = (event) => {
        let userInputData = this.state.About
        userInputData.value = event.target.value;
        this.setState({About: userInputData}, () => console.log(this.state))
    }

    onSubmitAbout = (e) => {
        e.preventDefault()
        // this.props.history.push({pathname: '/recinfo/about'})
        let {auth, authFunction} = this.props
        
        const data={
            company_about: this.state.About.value,
            id_user:auth.id_user
        }

        axios.post('https://tribe-test-server-v1.herokuapp.com/rec_info/about', data)
            .then(res => {
                console.log(res.data);
                if(res.data.result=="added")
                {
                    this.props.history.push({
                        pathname: '/recinfo/logo',
                    })
                }
                else
                {
                    const extra_details={
                        id_user:auth.id_user,
                        token:auth.token,
                        error:res.data.result
                    }
                    authFunction(extra_details)
                    this.props.history.push({
                        pathname: '/recinfo',
                    })
                }
        })  
    }

    onPreviousHandler = (event) => {
        event.preventDefault();
        this.props.history.goBack()
    }

    render(){
        return(
            <div className="RecInfo--Right">
                <form className="RecInfo--RightContainer" onSubmit={this.onSubmitAbout}>
                    <h1 className="RecInfo--RightHeading">About the Company</h1>

                    <Input  light
                            type = {this.state.About.elementType}
                            elementConfig = {this.state.About.elementConfig}
                            value = {this.state.About.value}
                            changed = {(event => this.onChangeHandler(event))}
                    />
                    <button className="RecInfo--NextInfo" type="submit">Next &rarr;</button>
                </form>
                <a className="RecInfo--BackInfo" onClick={event => this.onPreviousHandler(event)}>&larr; Back</a>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth.auth,
})

const mapDispatchToProps = dispatch => ({
    authFunction: data => dispatch(authDetails(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RecAbout);