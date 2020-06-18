import React from "react";
import {connect} from "react-redux";

import auth_rec from '../../../../../auth/auth_rec';
import axios from "axios";

import {openModal} from '../../../../../redux/modal/modal-action'
import {authDetails} from '../../../../../redux/auth/auth-action';

import NewButton from '../../../../../components/newButton/NewButton';
import PostingCard from '../../../recruiterComponents/PostingCard/PostingCard';
import Backdrop from '../../../../../components/backdrop/Backdrop';
import PostingModal from '../../../recruiterComponents/PostingModal/PostingModal';

import './Postings.css';

class Postings extends React.Component{

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

            const rec_cred={
                id_user:this.props.auth.id_user
            }

            axios.post("https://tribe-test-server-v1.herokuapp.com/get_postings",rec_cred).then((job_postings)=>{
                if(job_postings.error)
                {
                    console.log("error");
                }
                else
                {
                    //job_postings.data contains position,skills,date ; candidates hired will be sent later
                    console.log(job_postings.data)
                }
            })
        })
    }

    openModalHandler = () => {
        let {openModalFunc} = this.props;
        openModalFunc()
    }

    render(){
        let {display} = this.props
        return(
            <div className="Rec--Postings">
                <div className="Rec--PostingsContainer">
                    <h1 className="Rec--PostingContainerTitle">Previous Postings</h1>
                    <PostingCard title="Full stack developer" lang1="Mongo" lang2="Node.js" lang3="React.js" time="15 May, 2020" />
                    <PostingCard title="Full stack developer" lang1="Mongo" lang2="Node.js" lang3="React.js" time="15 May, 2020" />
                    <PostingCard title="Full stack developer" lang1="Mongo" lang2="Node.js" lang3="React.js" time="15 May, 2020" />
                    <PostingCard title="Full stack developer" lang1="Mongo" lang2="Node.js" lang3="React.js" time="15 May, 2020" />
                    <NewButton clicked={this.openModalHandler} margintop="5vh" small>Add Posting</NewButton>
                </div>

                <Backdrop display={display} />
                <PostingModal display={display} />
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


export default connect(mapStateToProps, mapDispatchToProps)(Postings);