import React from "react";

import './BadgeCard.css';

const BadgeCard = (props) => {
    return(
        <div className="BadgeCard" style={{backgroundColor: props.bgcolor}}>
            <img src={props.img} alt="badges" className="BadgeCard--Img" />
            <div className="BadgeCard--Lines">
                <div className="BadgeCard--Line" style={{width: '90%'}}></div>
                <div className="BadgeCard--Line" style={{width: '51%'}}></div>
                <div className="BadgeCard--Line" style={{width: '75%'}}></div>
            </div>
        </div>
    )
}

export default BadgeCard;