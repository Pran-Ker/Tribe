import React from "react";
import {connect} from "react-redux";

import {authDetails} from '../../../redux/auth/auth-action';
import DashNavbar from '../dashboardComponents/dashNavbar/DashNavbar';
import Sidenav from '../dashboardComponents/sidenav/Sidenav';
import SmallPortfolio from '../dashboardComponents/smallPortfolio/SmallPortfolio';
import HeadingStyle from '../dashboardComponents/heading/Heading';
import InspirationCard from './inspirationCard/InspirationCard';
import TopCompany from '../dashboardComponents/topCompany/TopCompany';
import FavCompany from '../dashboardComponents/favCompany/FavCompany';
import DashFooter from '../dashboardComponents/dashFooter/DashFooter';
import axios from 'axios'
import window from '../../../images/portfolio.svg';
import logo from '../../../images/Logo.png';
import heart from '../../../images/heart.svg';
import company from '../../../images/Company.svg';
import './Developer.css';

class Developer extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentDidMount(){
        let {auth, authFunction} = this.props;
    }

    logoutHandler = () => {
        console.log("hello")
        let {authFunction} = this.props;

        const id_user=this.props.id_user;
        const token=this.props.token

        const data={
            id_user:id_user,
            token:token
        }

        axios.post("https://tribe-test-server-v1.herokuapp.com/logout",data).then((res)=>{
            console.log(res.data)
            this.props.history.push({
                pathname: '/user'
            })
        })
    }

    render(){
        return(
            <div className="Developer--Wrapper">
                <div className="Developer">
                    <DashNavbar logout={this.logoutHandler} />
                    <Sidenav top="26%" left="5%" img1={window} img2={logo} img3={company} img4={heart} />
                    <div className="Developer--Content">
                        <SmallPortfolio />
                        <div className="Developer--Inspiration">
                            <HeadingStyle title="Inspiration" />
                            <div className="Developer--InspirationCards">
                                <InspirationCard />
                                <InspirationCard />
                                <InspirationCard />
                            </div>
                        </div>
                        <TopCompany />
                        <FavCompany />
                    </div>
                </div>
                <DashFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(Developer);