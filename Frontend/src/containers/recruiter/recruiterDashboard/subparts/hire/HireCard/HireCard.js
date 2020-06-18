import React from "react";

import './HireCard.css';

const HireCard = (props) => {
    return (
        <div className="Rec--HireCard" onClick={props.clicked}>
            <h1 className="Rec--HireCardTitle">{props.title}</h1>
        </div>
    )
}

export default HireCard;