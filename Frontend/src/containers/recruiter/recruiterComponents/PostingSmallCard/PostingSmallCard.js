import React from "react";

import './PostingSmallCard.css';

const PostingSmallCard = (props) => {
    return(
        <div className="PostingSmallCard">
            <h1 className="PostingSmallCard--Title">{props.title}</h1>
        </div>
    )
}

export default PostingSmallCard;