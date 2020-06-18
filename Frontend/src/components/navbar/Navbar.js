import React from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import SmoothScroll from "smooth-scroll";

import {loginForm, signupForm} from '../../redux/navigation/navigation-action';
import NewButton from '../newButton/NewButton';

import logo from '../../images/tribelogo.png';
import './Navbar.css';

class Navbar extends React.Component{

    constructor(props){
        super(props);
    }

    onChangeHandler = (event,type) => {
        let {loginFormFunction, signupFormFunction} = this.props
        if(type === "login"){
            loginFormFunction()
        }
        else{
            signupFormFunction()
        }
    }

    render(){

        const scroll = new SmoothScroll('.Navbar a[href*="#',{
            speed: 900,
            offset: function (anchor, toggle) {
                return 120
            }
        });

        return(
            <div className="Navbar">
                <img src={logo} className="Navbar--Logo" />
                <div className="Navbar--Links">
                    <Link to='#howitworks' className="Navbar--Link">How it works</Link>
                    <Link to='#whatwedo' className="Navbar--Link">What We Do?</Link>
                    <Link to='#features' className="Navbar--Link">Features</Link>
                    <Link to='#contactus' className="Navbar--Link">Contact Us</Link>
                    <Link to='/user'><NewButton small clicked={e => this.onChangeHandler(e,"login")}>Login</NewButton></Link>
                    <Link to='/user'><NewButton small light clicked={e => this.onChangeHandler(e,"signup")}>Register</NewButton></Link>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    loginFormFunction : () => dispatch(loginForm()),
    signupFormFunction: () => dispatch(signupForm())
})

export default connect(null,mapDispatchToProps)(Navbar);