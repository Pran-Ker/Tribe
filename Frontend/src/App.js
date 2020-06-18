import React, { Component } from 'react';
import {connect} from "react-redux";
import { Route, Switch} from "react-router-dom";

import Landing from './containers/landing/Landing';
import User from './containers/user/User';
import UserInfo from './containers/userinfo/UserInfo';
import Choice from './containers/choice/Choice';
import ForgotPwd from './containers/user/forgotpwd/ForgotPwd';
import ResetPwd from './containers/user/resetpwd/ResetPwd';
import Developer from './containers/dashboard/developer/Developer';
import Designer from './containers/dashboard/designer/Designer';
import BestWorkDev from './containers/bestwork/bestworkdev/BestWorkDev';
import BestWorkDes from './containers/bestwork/bestworkdes/BestWorkDes';
import RecruiterDashboard from './containers/recruiter/recruiterDashboard/RecruiterDashboard';
import RecruiterUser from './containers/recruiter/recruiterUser/RecruiterUser';
import RecruiterInfo from './containers/recruiter/recruiterInfo/RecruiterInfo';

import './App.css';

class App extends Component {

  render(){
    let {user} = this.props;
    let designation = user.designation
    let dashboard,bestwork;
    if(designation === "Designer"){
      dashboard = <Designer />
      bestwork = <BestWorkDes />
    }
    else if(designation === "Developer" ){
      dashboard = <Developer />
      bestwork = <BestWorkDev />
    }
    return (
        <Switch>
          <Route path='/user' component={User} />
          <Route path='/forgotpwd' component={ForgotPwd} />
          <Route path='/resetpwd' component={ResetPwd} />
          <Route path='/choice' component={Choice} />
          <Route path='/userinfo' component={UserInfo} />
          <Route path='/dashboard' render={() => dashboard} />
          <Route path='/bestwork' render={() => bestwork} />
          <Route path='/recdashboard' component={RecruiterDashboard} />
          <Route path='/recuser' component={RecruiterUser} />
          <Route path='/recinfo' component={RecruiterInfo} />
          <Route path='/' component={Landing} />
        </Switch>      
    );
  }

}

const mapStateToProps = state => ({
  user: state.user
})


export default connect(mapStateToProps)(App);
