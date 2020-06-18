import React from "react";
import { connect } from "react-redux";

import {authDetails} from '../../redux/auth/auth-action';
import {userDesignation, userPortfolio} from '../../redux/user/user-action';

import axios from "axios";
import './Choice.css';
import auth from '../../auth/auth'

class Choice extends React.Component{

    componentDidMount(){
        let {authFunction} = this.props;
        
        if(this.props.auth.error=="logged_out")
        {
            authFunction({error:"logged_out"})
            return this.props.history.push({
                pathname: '/user'
            })
        }
        const result = auth(this.props.auth);
        console.log(this.props.auth)
        console.log(result);
        result.then((res)=>{
            //res.designation contains the designation of the user.
            console.log(res);
            if(res.auth=="denied")
            {
                authFunction(res)
                return this.props.history.push({
                    pathname: '/user'
                })
            }
        })

    }

    onDesignationHandler = (e, type) => {
        e.preventDefault();
        let {auth, authFunction, userDesignationFunction} = this.props;
        
        const designation = type;
        console.log(this.props.auth)
        const data={
            designation:designation,
            id_user:auth.id_user
        };
        if(designation=="Designer")
        {
            axios.post('https://tribe-test-server-v1.herokuapp.com/des_desg', data).then((res)=>{
                if(res.data.error)
                {
                    authFunction(res.data.error)
                    this.props.history.push({
                        pathname: '/user',
                    })
                }
                else
                {
                    userDesignationFunction(designation)
                }
            });
        }
        else if(designation=="Developer")
        {
            axios.post('https://tribe-test-server-v1.herokuapp.com/dev_desg', data).then((res)=>{
                if(res.data.error)
                {
                    authFunction(res.data.error)
                    this.props.history.push({
                        pathname: '/user',
                    })
                }
                else
                {
                    userDesignationFunction(designation)
                }
            });
        }
        // this.setState({designation: designation})
    }

    onChoiceHandler = (e, type) => {
        e.preventDefault();
        let {user, userPortfolioFunction} = this.props;
        const portfolio = type;
        userPortfolioFunction(portfolio)
        if(user.designation=="Designer")
        {
            if(portfolio=="No")
            {
                this.props.history.push({
                    pathname: '/userinfo',
                })
            }
        }
        else if(user.designation=="Developer")
        {
            if(portfolio=="No")
            {
                this.props.history.push({
                    pathname: '/userinfo'
                })

            }
        }
    }

    onSubmitDomain=(e)=>{
        e.preventDefault();
        let {user, authFunction} = this.props;
        const data={
            id_user:this.props.location.state.detail.id_user,
            domain:document.getElementById('domain_name').value
        }
        if(user.designation=="Designer")
        {
            axios.post('https://tribe-test-server-v1.herokuapp.com/des_domain', data).then((res)=>{
                if(res.data.error=="tech_issue")
                {
                    authFunction(res.data.error)
                    this.props.history.push({
                        pathname: '/user',
                    })
                }
                else
                {
                    //Redirect to hiring.  
                }
                console.log(res.data)
            });
        }
        else if(user.designation=="Developer")
        {
            axios.post('https://tribe-test-server-v1.herokuapp.com/dev_domain', data).then((res)=>{
                if(res.data.error=="tech_issue")
                {
                    authFunction(res.data.error)
                    this.props.history.push({
                        pathname: '/user',
                    })
                }
                else
                {
                    //Redirect to hiring.  
                }
                console.log(res.data)
            });
        }
        

    }

    render(){
        let {user} = this.props
        let options = <div className="Choice--Options">
                            <h1 className="Choice--InfoTitle">Are you a,</h1>
                            <div className="Choice--InfoOptions">
                                <h1 className="Choice--InfoOptionsTitle" onClick={event => this.onDesignationHandler(event,"Designer")}>Designer</h1>
                                <h1 className="Choice--InfoOptionsTitle">Or</h1>
                                <h1 className="Choice--InfoOptionsTitle" onClick={event => this.onDesignationHandler(event,"Developer")}>&lt;&#x2f;Developer&gt;</h1>
                            </div>
                        </div>   
        if(user.designation){
            options =  <div className="Choice--Options">
                            <h1 className="Choice--InfoTitle">Do you have a portfolio?</h1>
                            <div className="Choice--InfoOptions">
                                <h1 className="Choice--InfoOptionsTitle" onClick={event => this.onChoiceHandler(event,"Yes")}>Yes</h1>
                                <h1 className="Choice--InfoOptionsTitle">Or</h1>
                                <h1 className="Choice--InfoOptionsTitle" onClick={event => this.onChoiceHandler(event,"No")}>No</h1>
                            </div>
                        </div>  
        }

        if(user.portfolio === "Yes"){
            options = <div className="Choice--Options">
                          <h1 className="Choice--InfoTitle">Do you have a portfolio?</h1>
                          <form className="Choice--OptionLink" onSubmit={this.onSubmitDomain}>
                              <h1 className="Choice--InfoOptionsTitle">Yes</h1>
                              <input className="Choice--OptionLinkUrl" type="text" id="domain_name" name="domain_name" placeholder="Enter the domain name"/>
                              <button type="submit" className="User--Button">Submit</button>
                          </form>
                      </div>
        }
        return(
            <div className="Choice">
                <div className="Choice--Info">
                    <h1 className="Choice--InfoHeading">You made the <span style={{color : '#6565FF'}}>right choice</span></h1>
                    {options}
                </div>
            </div>
    )
}
}

const mapStateToProps = state => ({
    auth: state.auth.auth,
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    authFunction: data => dispatch(authDetails(data)),
    userDesignationFunction: data => dispatch(userDesignation(data)),
    userPortfolioFunction: data => dispatch(userPortfolio(data))
})

export default connect(mapStateToProps,mapDispatchToProps)(Choice);