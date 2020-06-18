import React from "react";

import div2vid from '../../../images/div2vid.mp4';

import './ForUser.css';

const ForUser = () => {
    return(
        <div className="NewDiv1" id="whatwedo">
            <div className="NewDiv1--Headings">
                <h1 className="NewDiv1--HeadingTitle">DESIGNER OR A DEVELOPER</h1>
                <h1 className="NewDiv1--HeadingSubtitle">LET THE WORK SHOW ITSELF OFF</h1>
            </div>

            <div className="NewDiv1--Content">
                <div className="NewDiv1--ContentText">
                    <h1 className="NewDiv1--ContentTextHeading">Brag about what you know</h1>
                    <p className="NewDiv1--ContentTextPara">We give you all round profile based on the public and private data you hold on different sites</p>
                    <p className="NewDiv1--ContentTextPara">Your Tribe profile will be all you need to show off your work and get hired.</p>
                </div>

                <div className="NewDiv1--ContentAnimation">
                    <video autoPlay={true} height="600" loop={true} muted>
                        <source type="video/mp4" src={div2vid} />
                    </video>
                </div>
            </div>
        </div>
    )
}

export default ForUser;