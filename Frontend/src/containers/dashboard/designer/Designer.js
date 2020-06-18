import React from "react";
import {connect} from "react-redux";
import axios from "axios";
import queryString from 'query-string';
import {withRouter} from 'react-router-dom';
import {authDetails} from '../../../redux/auth/auth-action';
import DashNavbar from '../dashboardComponents/dashNavbar/DashNavbar';
import Sidenav from '../dashboardComponents/sidenav/Sidenav';
import SmallPortfolio from '../dashboardComponents/smallPortfolio/SmallPortfolio';
import HeadingStyle from '../dashboardComponents/heading/Heading';
import TopCompany from '../dashboardComponents/topCompany/TopCompany';
import FavCompany from '../dashboardComponents/favCompany/FavCompany';
import DashFooter from '../dashboardComponents/dashFooter/DashFooter';
import auth from '../../../auth/auth';

import window from '../../../images/portfolio.svg';
import logo from '../../../images/Logo.png';
import heart from '../../../images/heart.svg';
import company from '../../../images/Company.svg';
import './Designer.css';

class Designer extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
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
            console.log(res);
            if(res.auth=="denied")
            {
                authFunction(res)
                this.props.history.push({
                    pathname: '/user',
                })
            }

            const dash_cred={
                id_user:this.props.auth.id_user,
            }

            axios.post("https://tribe-test-server-v1.herokuapp.com/get_des_dashboard",dash_cred).then((dash_data)=>{
                if(dash_data.error)
                {
                    console.log("tech_issue");
                }
                else
                {
                    //dash_data.data contains pic and inspiration.
                    console.log(dash_data.data);
                }
            })

        })
    }

    GetInspiration=()=>{
        let {authFunction} = this.props;
        console.log(this.props.location.search);
        let params = queryString.parse(this.props.location.search)
        
        let page=parseInt(params.page)+1;

        let limit=params.limit;

        const data={
            id_user:this.props.auth.id_user,
            page:page,
            limit:limit
        }

        params.page=page;

        let new_params="?"+queryString.stringify(params)
        console.log(new_params)

        axios.post("https://tribe-test-server-v1.herokuapp.com/inspiration",data).then((inspire)=>{
            if(inspire.error)
            {
                console.log("error");
            }
            else
            {
                console.log(inspire.data);
                this.props.history.push({
                    pathname: '/dashboard',
                    search:new_params
                })
            }
        })
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
            <div className="Designer--Wrapper">
                <div className="Designer">
                    <DashNavbar logout={this.logoutHandler}/>
                    <Sidenav top="26%" left="5%" img1={window} img2={logo} img3={company} img4={heart} />
                    <div className="Designer--Content">
                        <SmallPortfolio />
                        <div className="Designer--Inspiration">
                            <HeadingStyle title="Inspiration" />
                            <div className="Designer--InspirationCards">
                                <button onClick={this.GetInspiration}>Show More</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Designer));