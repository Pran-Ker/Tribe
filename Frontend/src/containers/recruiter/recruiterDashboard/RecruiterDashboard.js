import React from "react";
import {Route} from 'react-router-dom'
import axios from "axios";

import RecDashNavbar from '../recruiterComponents/RecDashNavbar/RecDashNavbar';
import Home from './subparts/home/Home';
import Profile from './subparts/profile/Profile';
import Postings from './subparts/postings/Postings';
import Calendar from './subparts/calendar/Calendar';
import Hire from './subparts/hire/Hire';

import './RecruiterDashboard.css';

class RecruiterDashboard extends React.Component{
    state={

    }

    render(){
        return(
            <div className="RecDashboard">
                <RecDashNavbar />
                <Route exact path="/recdashboard" component={Home} />
                <Route exact path="/recdashboard/profile" component={Profile} />
                <Route exact path="/recdashboard/postings" component={Postings} />
                <Route exact path="/recdashboard/calendar" component={Calendar} />
                <Route exact path="/recdashboard/hire" component={Hire} />
            </div>
        )
    }
}

export default RecruiterDashboard;