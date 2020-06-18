import React from "react";

import './MemberCard.css';

const MemberCard = (props) => {
    return(
        <div className="MemberCard">
            <div className="MemberCard--Details">
                <h1 className="MemberCard--Title">{props.name}</h1>
                <h1 className="MemberCard--SubTitle">{props.title}</h1>
            </div>
            <h1 className="MemberCard--Company">{props.company}</h1>
        </div>
    )
}

export default MemberCard;