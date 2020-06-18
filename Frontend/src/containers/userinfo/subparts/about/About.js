import React from "react";
import queryString from 'query-string';
import {connect} from "react-redux";
import {authDetails} from '../../../../redux/auth/auth-action';
import axios from "axios";
import auth from '../../../../auth/auth';
import SideContent from '../sideContent/SideContent';
import Input from '../../../../components/input/Input';

class About extends React.Component{
    state={
        About : {
            elementType : 'textarea',
            elementConfig : {
                placeholder : 'About Yourself',
                cols: '50',
                rows: '3',
                name:"about",
                // id:"about",
                required:true
            },
            value: '',
        }
    }

    componentDidMount(){
        let {authFunction} = this.props;
        console.log(this.props.auth);
        if(this.props.auth.error=="logged_out")
        {
            authFunction({error:"logged_out"})
            return this.props.history.push({
                pathname: '/user'
            })
        }
        const result=auth(this.props.auth);
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

    onPreviousHandler = (event) => {
        event.preventDefault();
        this.props.history.goBack()
    }

    onSubmitAbout=(e)=>{
        e.preventDefault();
        let {auth, authFunction} = this.props
        
        const data={
            about: this.state.About.value,
            id_user:auth.id_user
        }

        axios.post('https://tribe-test-server-v1.herokuapp.com/userpf/about', data)
            .then(res => {
                if(res.data.result=="added")
                {
                    this.props.history.push({
                        pathname: '/userinfo/socialmedia',
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
                        pathname: '/userinfo',
                    })
                }
        })  
    }

    render(){
        return(
            <div className="UserInfo">
                <SideContent />
                <div className="UserInfo--Div2">
                    <form className="UserInfo--Div2Container" onSubmit={this.onSubmitAbout}>
                        <h1 className="UserInfo--Div2Heading">About Yourself</h1>
                        <p className="UserInfo--Div2Para">Describe yourself in three lines. Keep it crisp and short</p>

                        <Input  light
                                type = {this.state.About.elementType}
                                elementConfig = {this.state.About.elementConfig}
                                value = {this.state.About.value}
                                changed = {(event => this.onChangeHandler(event))}
                        />
                        <button className="UserInfo--NextInfo" type="submit">Next &rarr;</button>
                    </form>
                    <a className="UserInfo--BackInfo" onClick={event => this.onPreviousHandler(event)}>&larr; Back</a>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);