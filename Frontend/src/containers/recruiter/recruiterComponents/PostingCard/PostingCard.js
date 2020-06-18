import React from "react"

import './PostingCard.css';

const PostingCard = (props) => {
    return(
        <div className="PostingCard">
            <div className="PostingCard--Requirements">
                <h1 className="PostingCard--Title">{props.title}</h1>
                <div className="PostingCard--Lang">
                    <div className="PostingCard--Language">{props.lang1}</div>
                    <div className="PostingCard--Language">{props.lang2}</div>
                    <div className="PostingCard--Language">{props.lang3}</div>
                </div>
            </div>
            <div className="PostingCard--Time">
                <h1 className="PostingCard--Title">Posted On</h1>
                <h1 className="PostingCard--Subtitle">{props.time}</h1>
            </div>
            <div className="PostingCard--Hired">
                <h1 className="PostingCard--Title">Candidates hired</h1>

            </div>
        </div>
    )
}

export default PostingCard;