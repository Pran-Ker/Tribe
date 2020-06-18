import React from "react";

import './SideContent.css';

const SideContent = (props) => {
    return(
        <div className="SideContent">
            <h1 className="SideContent--Title">{props.title}</h1>
        </div>
    )
}

export default SideContent;