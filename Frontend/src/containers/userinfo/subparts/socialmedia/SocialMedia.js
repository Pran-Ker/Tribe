import React from "react";
import queryString from 'query-string';
import {connect} from "react-redux";
import {authDetails} from '../../../../redux/auth/auth-action';
import axios from "axios";

import auth from '../../../../auth/auth';
import SideContent from '../sideContent/SideContent';
import Input from '../../../../components/input/Input';

import fb from '../../../../images/fbcolor.svg';
import insta from '../../../../images/instacolor.svg';
import twitter from '../../../../images/tweetcolor.svg';
import link from '../../../../images/linkcolor.svg';
import snap from '../../../../images/snapcolor.svg';

class SocialMedia extends React.Component{

    state = {
        Facebook : {
            elementType : 'input',
            elementConfig : {
                placeholder : 'Facebook Profile',
                type: 'text',
                name:"fb",
                id:"fb"
            },
            value: '',
        },
        Insta : {
            elementType : 'input',
            elementConfig : {
                placeholder : 'Instagram Profile',
                type: 'text',
                name:"insta",
                id:"insta"
            },
            value: '',
        },
        Twitter : {
            elementType : 'input',
            elementConfig : {
                placeholder : 'Twiiter Profile',
                type: 'text',
                name:"twitter",
                id:"twitter"
            },
            value: '',
        },
        Snapchat : {
            elementType : 'input',
            elementConfig : {
                placeholder : 'Snapchat Profile',
                type: 'text',
                name:"snap",
                id:"snap"
            },
            value: '',
        },
        Linkedin : {
            elementType : 'input',
            elementConfig : {
                placeholder : 'Linkedin Profile',
                type: 'text',
                name:"linked_in",
                id:"linked_in"
            },
            value: '',
        },
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
            if(res.auth=="denied")
            {
                authFunction(res)
                this.props.history.push({
                    pathname: '/user',
                })
            }
        })

    }

    onChangeHandler = (event, type) => {
        let userInputData = this.state
        let userInput = userInputData[type];
        userInput.value = event.target.value;
        userInputData[type] = userInput;
        this.setState({userInputData}, () => console.log(this.state))
    }

    onPreviousHandler = (event) => {
        event.preventDefault();
        this.props.history.goBack()
    }

    onSubmitSocialMedia=(e)=>{
        let {Facebook,Insta,Twitter,Snapchat,Linkedin} = this.state;
        e.preventDefault();
        let {auth, authFunction} = this.props
        const social_media_links = [Facebook.value,Insta.value,Twitter.value,Snapchat.value,Linkedin.value]
        const data={
            social:social_media_links,
            id_user: auth.id_user
        }

        axios.post('https://tribe-test-server-v1.herokuapp.com/userpf/socialmedia', data)
            .then(res => {
                if(res.data.result=="added")
                {
                    this.props.history.push({
                        pathname: '/userinfo/skills',
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
                    <form className="UserInfo--Div2Container" onSubmit={this.onSubmitSocialMedia}>
                        <h1 className="UserInfo--Div2Heading">Social Media Links</h1>
                        <p className="UserInfo--Div2Para">Link them so that people can reach you!</p>

                        <div className="UserInfo--Div2SocialIcons">
                            <img src={fb} className="UserInfo--Div2SocialIcon" alt="fb" />
                            <Input  light
                                    type = {this.state.Facebook.elementType}
                                    elementConfig = {this.state.Facebook.elementConfig}
                                    value = {this.state.Facebook.value}
                                    changed = {(event => this.onChangeHandler(event, "Facebook"))}
                            />
                        </div>

                        <div className="UserInfo--Div2SocialIcons">
                            <img src={insta} className="UserInfo--Div2SocialIcon" alt="insta" />
                            <Input  light
                                type = {this.state.Insta.elementType}
                                elementConfig = {this.state.Insta.elementConfig}
                                value = {this.state.Insta.value}
                                changed = {(event => this.onChangeHandler(event, "Insta"))}
                        />
                        </div>

                        <div className="UserInfo--Div2SocialIcons">
                            <img src={snap} className="UserInfo--Div2SocialIcon" alt="snap" />
                            <Input  light
                                type = {this.state.Snapchat.elementType}
                                elementConfig = {this.state.Snapchat.elementConfig}
                                value = {this.state.Snapchat.value}
                                changed = {(event => this.onChangeHandler(event, "Snapchat"))}
                        />
                        </div>

                        <div className="UserInfo--Div2SocialIcons">
                            <img src={twitter} className="UserInfo--Div2SocialIcon" alt="tweet" />
                            <Input  light
                                type = {this.state.Twitter.elementType}
                                elementConfig = {this.state.Twitter.elementConfig}
                                value = {this.state.Twitter.value}
                                changed = {(event => this.onChangeHandler(event, "Twitter"))}
                        />
                        </div>

                        <div className="UserInfo--Div2SocialIcons">
                            <img src={link} className="UserInfo--Div2SocialIcon" alt="linkedin" />
                            <Input  light
                                type = {this.state.Linkedin.elementType}
                                elementConfig = {this.state.Linkedin.elementConfig}
                                value = {this.state.Linkedin.value}
                                changed = {(event => this.onChangeHandler(event, "Linkedin"))}
                        />
                        </div>

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


export default connect(mapStateToProps, mapDispatchToProps)(SocialMedia);