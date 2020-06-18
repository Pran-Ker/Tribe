import React from "react";
import {connect} from "react-redux";
import auth_rec from '../../../../../auth/auth_rec';
import axios from "axios";

import {openModal} from '../../../../../redux/modal/modal-action';
import {authDetails} from '../../../../../redux/auth/auth-action';

import PostingSmallCard from '../../../recruiterComponents/PostingSmallCard/PostingSmallCard';
import HomeCard from '../../../recruiterComponents/HomeCard/HomeCard';
import Backdrop from '../../../../../components/backdrop/Backdrop';
import PostingModal from '../../../recruiterComponents/PostingModal/PostingModal';

import plus from '../../../../../images/plus.svg';
import './Home.css';

class Home extends React.Component{

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

            const dash_cred={
                id_user:this.props.auth.id_user
            }

            axios.post("https://tribe-test-server-v1.herokuapp.com/get_dashboard",dash_cred).then((dash_data)=>{
                if(dash_data.error)
                {
                    console.log("erro");
                }
                else
                {
                    //dash_data.data contains dashboard data like job posts,company logo, scheduled meetings
                    console.log(dash_data.data);
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
            <div className="Rec--Home">

                <div className="Rec--HomePostings">
                    <h1 className="Rec--HomeTitle">Postings</h1>
                    <div className="Rec--HomePosting">
                        <PostingSmallCard title="Machine learning" />
                        <PostingSmallCard title="Web Developer" />
                        <PostingSmallCard title="UI/UX" />
                    </div>
                    <div className="Rec--HomeAddPosting">
                        <h1 className="Rec--HomeTitle">Add Posting</h1>
                        <div className="Rec--HomeAdd" onClick={this.openModalHandler}>
                            <img src={plus} alt="plus" className="Rec--HomeAddBtn" />
                        </div>
                    </div>
                </div>

                <div className="Rec--HomeContent">
                    <h1 className="Rec--HomeContentTitle">Hello!</h1>
                    <div className="Rec--HomeInterview">
                        <h1 className="Rec--HomeHeading">Scheduled Interviews</h1>
                        <HomeCard name="Rachit Manchanda" post="Machine learning" chat/>
                        <HomeCard name="Rachit Manchanda" post="Machine learning" chat/>
                    </div>    
                    <div className="Rec--HomeRecommended">
                        <h1 className="Rec--HomeHeading">Recommended Candidates</h1>
                        <HomeCard name="Rachit Manchanda" post="Machine learning" />
                        <HomeCard name="Rachit Manchanda" post="Machine learning" />
                    </div>  
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);