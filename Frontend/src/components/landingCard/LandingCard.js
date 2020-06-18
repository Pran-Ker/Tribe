import React from "react";

import './LandingCard.css';

const LandingCard = (props) => {
    return(
        <div className="LandingCard">
            <img src={props.src} className="LandingCard--Img" alt="cardimg" />
            <h1 className="LandingCard--Title">{props.title}</h1>
        </div>
    )
}

export default LandingCard;
