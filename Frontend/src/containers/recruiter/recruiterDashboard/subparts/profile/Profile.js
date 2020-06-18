import React from "react";
import {connect} from "react-redux";
import axios from "axios";
import auth_rec from '../../../../../auth/auth_rec';

import {openModal} from '../../../../../redux/modal/modal-action';
import {authDetails} from '../../../../../redux/auth/auth-action';

import MemberCard from './memberCard/MemberCard';
import UserModal from '../../../recruiterComponents/UserModal/UserModal';
import Backdrop from '../../../../../components/backdrop/Backdrop';

import plus from '../../../../../images/plus.svg';
import './Profile.css';

class Profile extends React.Component{
    state={

    }

    componentDidMount(){
        let {authFunction} = this.props;
        console.log(this.props.auth)
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
                return this.props.history.push({
                    pathname: '/user',
                })
            }

            const profile_cred={
                id_user:this.props.auth.id_user
            }

            axios.post("https://tribe-test-server-v1.herokuapp.com/rec_profile",profile_cred).then((profile)=>{
                if(profile.error)
                {
                    console.log("tech error")
                }
                else
                {
                    //profile.data contains company logo, company name, company description.
                    console.log(profile.data);
                }
            })

        })
    }

    openModalHandler = () => {
        let {openModalFunc} = this.props;
        openModalFunc()
    }

    render(){
        let {display} = this.props;
        return(
            <div className="Rec--ProfileContainer">

                <div className="Rec--Profile">
                    <h2 className="Rec--ProfileEdit">Edit</h2>
                    <h1 className="Rec--ProfileTitle">Company Logo</h1>
                    <div className="Rec--ProfilePic"></div>
                    <div className="Rec--ProfileData">
                        <h1 className="Rec--ProfileSub">Name</h1>
                        <p className="Rec--ProfilePara">Google Inc.</p>
                    </div>
                    <div className="Rec--ProfileData">
                        <h1 className="Rec--ProfileSub">Description</h1>
                        <p className="Rec--ProfilePara">Lorem Ipsum is a very lazy thing to do but okay, I am still going to type shit.
                                                        I hope Google implements Tribe in their HR routine.</p>
                    </div>
                </div>

                <div className="Rec--Members">
                    <h1 className="Rec--MemberTitle">Current Members</h1>
                    <div className="Rec--MemberPostings">
                        <MemberCard name="Rachit Manchanda" title="Senior Officer" company="Google Inc."/>
                        <div className="Rec--MemberAdd" onClick={this.openModalHandler}>
                            <img src={plus} alt="plus" className="Rec--MemberAddBtn" />
                        </div>
                        <h1 className="Rec--MemberPremium">Upgrade to Premium <br /> to add more</h1>
                    </div>
                </div>

                <Backdrop display={display} />
                <UserModal display={display} />

            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth.auth,
    display: state.modal.modalDisplay
})

const mapDispatchToProps = dispatch => ({
    authFunction: data => dispatch(authDetails(data)),
    openModalFunc: () => dispatch(openModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);