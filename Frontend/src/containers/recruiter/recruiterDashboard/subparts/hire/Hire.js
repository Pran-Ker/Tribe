import React from "react";
import {connect} from "react-redux";

import {authDetails} from '../../../../../redux/auth/auth-action';
import HireCard from './HireCard/HireCard';

import './Hire.css';

class Hire extends React.Component{
    state={

    }

    render(){
        return(
            <div className="Rec--Hire">
                <div className="Rec--HirePostings">
                    <h1 className="Rec--HireTitle">Postings</h1>
                    <HireCard title="Machine Learning" />
                    <HireCard title="Web Development" />
                    <HireCard title="UI/UX Design" />
                </div>
                <div className="Rec--HireRecommend">
                    <h1 className="Rec--HireTitle">Recommended Candidates</h1>
                    <div className="Rec--HireRecommendations">
                        <div className="Rec--HireData"></div>
                        <div className="Rec--HireTools"></div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Hire);