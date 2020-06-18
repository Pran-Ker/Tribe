import React from "react";

import './InspirationCard.css';

const InspirationCard = (props) => {
    return(
        <div className="InspirationCard">
            <div className="InspirationCard--Header"></div>
            <div className="InspirationCard--Middle">
                <div className="InspirationCard--Line1"></div>
                <div className="InspirationCard--Line2"></div>
            </div>
            <div className="InspirationCard--Imgs">
                <img src={props.img} className="InspirationCard--Img" alt="img" />
            </div>
        </div>
    )
}

export default InspirationCard;