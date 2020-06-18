import React from "react";

import './InterviewCard.css';

const InterviewCard = (props) => {
    return(
        <div className="InterviewCard">
            <div className="InterviewCard--Color" style={{backgroundColor: props.color}}></div>
            <div className="InterviewCard--Text">
                <h1 className="InterviewCard--Head">{props.name}</h1>
                <h1 className="InterviewCard--SubHead">{props.post}</h1>
            </div>
            <div className="InterviewCard--Chat">Chat</div>
        </div>
    )
}

export default InterviewCard;