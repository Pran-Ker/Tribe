import React from "react";

import tribelogo from '../../../../images/tribelogo.png';
import './DashNavbar.css';

const DashNavbar = (props) => {
    return(
        <div className="DashNavbar">
            <img src={tribelogo} className="DashNavbar--Logo" />
            <div className="DashNavbar--Links">
                <a href="#" className="DashNavbar--Link">Home</a>
                <a href="#" className="DashNavbar--Link">Leaderboard</a>
                <a href="#" className="DashNavbar--Link">Portfolio</a>
                <a href="#" className="DashNavbar--Link">Get Hired</a>
                <a href="#" className="DashNavbar--Link" onClick={props.logout}>Logout</a>
                <div className="DashNavbar--Img"></div>
            </div>
        </div>
    )
}

export default DashNavbar