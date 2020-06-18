import React from "react";
import {NavLink} from "react-router-dom";

import tribelogo from '../../../../images/tribelogo.png';
import './RecDashNavbar.css';

const RecDashNavbar = (props) => {
    return(
        <div className="RecDashNavbar">
            <img src={tribelogo} className="RecDashNavbar--Logo" />
            <div className="RecDashNavbar--Links">
                <NavLink exact to='/recdashboard' activeClassName="RecDashNavbar--Active" className="RecDashNavbar--Link">Dashboard</NavLink>
                <NavLink exact to='/recdashboard/profile' activeClassName="RecDashNavbar--Active" className="RecDashNavbar--Link">Profile</NavLink>
                <NavLink exact to='/recdashboard/hire' activeClassName="RecDashNavbar--Active" className="RecDashNavbar--Link">Hire</NavLink>
                <NavLink exact to='/recdashboard/postings' activeClassName="RecDashNavbar--Active" className="RecDashNavbar--Link">Postings</NavLink>
                <NavLink exact to='/recdashboard/chat' activeClassName="RecDashNavbar--Active" className="RecDashNavbar--Link">Chat</NavLink>
                <div className="RecDashNavbar--Img"></div>
            </div>
        </div>
    )
}

export default RecDashNavbar