import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import {recSignupForm, signupForm} from '../../../redux/navigation/navigation-action';
import BadgeCard from './badgeCard/BadgeCard';

import Badge1 from '../../../images/badge1.png';
import Badge2 from '../../../images/badge2.png';
import Badge3 from '../../../images/badge3.png';

import NewButton from '../../../components/newButton/NewButton';
import './ForCompany.css';

class ForCompany extends React.Component {
    
    onChangeHandler = (type) => {
        let {signupFormFunction, recSignupFormFunction} = this.props
        if(type === "user"){
            signupFormFunction()
        }
        else{
            recSignupFormFunction()
        }
    }

    render(){
        return(
            <div className="NewDiv3">
                <div className="NewDiv3--TitleContainer">
                    <h1 className="NewDiv3--TitleContainer1">HIRE THE RIGHT TALENT</h1>
                    <h1 className="NewDiv3--TitleContainer2">in the minimal efforts</h1>
                </div>
    
                <div className="NewDiv3--Content">
                    <div className="NewDiv3--ContentText">
                        <p className="NewDiv3--ContentPara">Wasting hours on filtering applications and tracking candidates? </p>
                        <p className="NewDiv3--ContentPara">Our machine learning algorithms automatically sort the candidates based on relevance and skill 
                        checks. Our AI then lets you complete the recruitment process intuitively.</p>
    
                        <div className="NewDiv3--Buttons">
                            <Link to="/recuser"><NewButton white clicked={this.onChangeHandler("rec")}>Start hiring</NewButton></Link>
                            <NewButton transparent>Get prices</NewButton>
                        </div>
                    </div>
    
                    <div className="NewDiv3--Badges">
                        <BadgeCard img={Badge1} bgcolor="#FFFB88" />
                        <BadgeCard img={Badge2} bgcolor="#CBCAB1" />
                        <BadgeCard img={Badge3} bgcolor="#F2CD9C" />
                    </div>
    
                </div>
    
                <div className="NewDiv3--Footer">
                    <div className="NewDiv3--FooterContainer">
                        <h1 className="NewDiv3--FooterContainer1">Still stuck at resumes?</h1>
                        <h1 className="NewDiv3--FooterContainer2">get yourself a portfolio</h1>
                    </div>
                    <Link to="/user"><NewButton clicked={this.onChangeHandler("user")}>join now</NewButton></Link>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    recSignupFormFunction: () => dispatch(recSignupForm()),
    signupFormFunction: () => dispatch(signupForm())
})

export default connect(null, mapDispatchToProps)(ForCompany);