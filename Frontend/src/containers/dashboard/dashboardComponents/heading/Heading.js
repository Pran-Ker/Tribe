import React from "react";

import './Heading.css';

const Heading = (props) => {
    return(
        <div className="HeadingStyle">
            <h1 className="HeadingStyle--Title">{props.title}</h1>
            <div className="HeadingStyle--Underline"></div>
        </div>
    )
}

export default Heading;