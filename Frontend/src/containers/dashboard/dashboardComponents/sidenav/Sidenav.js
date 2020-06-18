import React from "react";

import './Sidenav.css';

const SideNav = (props) => {
    return(
        <div className="Sidenav" style={{top: props.top, left: props.left}}>
            <div className="Sidenav--Item">
                <img src={props.img1} className="Sidenav--Img" alt="Img" />
            </div>

            <div className="Sidenav--Item">
                <img src={props.img2} className="Sidenav--Img" alt="Img" />
            </div>

            <div className="Sidenav--Item">
                <img src={props.img3} className="Sidenav--Img" alt="Img" />
            </div>

            <div className="Sidenav--Item">
                <img src={props.img4} className="Sidenav--Img" alt="Img" />
            </div>
            
        </div>
    )
}

export default SideNav;