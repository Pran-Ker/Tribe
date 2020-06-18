import React from "react"

import logo from '../../../../images/tribelogo.png'
import './DashFooter.css'

const DashFooter = (props) => {
    return(
        <div className="DashFooter">
            <img src="DashFooter--Logo" alt="Logo" src={logo} />

            <div className="DashFooter--Links">
                <div className="DashFooter--LinkCol">
                    <h1 className="DashFooter--Mainlink">Product</h1>
                    <div className="DashFooter--Sublinks">
                        <h1 className="DashFooter--Sublink">About Us</h1>
                        <h1 className="DashFooter--Sublink">Team</h1>
                        <h1 className="DashFooter--Sublink">Career</h1>
                    </div>
                </div>

                <div className="DashFooter--LinkCol">
                    <h1 className="DashFooter--Mainlink">Support</h1>
                    <div className="DashFooter--Sublinks">
                        <h1 className="DashFooter--Sublink">About Us</h1>
                        <h1 className="DashFooter--Sublink">Team</h1>
                    </div>
                </div>

                <div className="DashFooter--LinkCol">
                    <h1 className="DashFooter--Mainlink">Discover</h1>
                    <div className="DashFooter--Sublinks">
                        <h1 className="DashFooter--Sublink">About Us</h1>
                        <h1 className="DashFooter--Sublink">Team</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashFooter;