import React, {Component} from "react";
import {Route} from "react-router-dom";
import {connect} from "react-redux";
import {authDetails} from '../../redux/auth/auth-action';

import auth from '../../auth/auth';
import About from './subparts/about/About';
import SocialMedia from './subparts/socialmedia/SocialMedia';
import Skills from './subparts/skills/Skills';
import Pic from './subparts/pic/Pic';

import './UserInfo.css';

class UserInfo extends Component{

    componentDidMount(){
        let {authFunction} = this.props;
        if(this.props.auth.error=="logged_out")
        {
            authFunction({error:"logged_out"})
            return this.props.history.push({
                pathname: '/user'
            })
        }
        const result=auth(this.props.auth);
        result.then((res)=>{
            if(res.auth=="denied")
            {
                authFunction(res)
                this.props.history.push({
                    pathname: '/user'
                })
            }
        })

    }

    render(){

        return(
            <div>
                <Route exact path='/userinfo' component={About} />
                <Route exact path='/userinfo/socialmedia' component={SocialMedia} />
                <Route exact path='/userinfo/skills' component={Skills} />
                <Route exact path='/userinfo/pic' component={Pic} />
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

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);