import React from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import { signupForm } from "../../../redux/navigation/navigation-action";

import LandingCard from '../../../components/landingCard/LandingCard';
import NewButton from '../../../components/newButton/NewButton';

import userpic from '../../../images/user.png';
import arrow from '../../../images/arrow.png';
import publishpic from '../../../images/publish.png';
import leaderpic from '../../../images/leader.png';
import homevid from '../../../images/home.mp4';

import './Home.css';

class Home extends React.Component{

    onChangeHandler = (type) => {
        let {signupFormFunction} = this.props
        signupFormFunction()
    }

    render(){
        return(
            <div className="NewLanding">
                <div className="NewLanding--TopContainer">
                    <div className="NewLanding--Left">
                        <h1 className="NewLanding--LeftHeading">GET OVER RESUMES, <br /> GET A <span className="NewLanding--LeftHandingSpan"> PORTFOLIO</span>.</h1>
                        <Link to="/user"><NewButton clicked={this.onChangeHandler}>Join Now</NewButton></Link>
                        <p className="NewLanding--LeftPara">BOOST YOUR CAREER OPPURTUNITIES <br /> WITH A FREE ONLINE PORTFOLIO.</p>
                    </div>

                    <div className="NewLanding--Right">
                        <video autoPlay={true} height="550" loop={true} muted>
                            <source type="video/mp4" src={homevid} />
                        </video>
                    </div>
                </div>
                <div className="NewLanding--BottomContainer" id="howitworks">
                    <LandingCard src={userpic} title="Create a profile" />
                    <img src={arrow} className="NewLanding--Arrow" alt="arrow" />
                    <LandingCard src={publishpic} title="check out your dashboard" />
                    <img className="NewLanding--Arrow" src={arrow} alt="arrow" />
                    <LandingCard src={leaderpic} title="Get Hired" />
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    signupFormFunction: () => dispatch(signupForm())
})

export default connect(null,mapDispatchToProps)(Home);