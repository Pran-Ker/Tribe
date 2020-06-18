import React from "react";

import charts from '../../../../images/charts.png';
import './Work.css';

const Work = () => {
    return(
        <div className="Work">
            <h1 className="Work--Title">We provide you with an in depth analysis of your work. These tools track a progress on how well you've been doing.</h1>
            <img src={charts} alt="Charts" className="Work--Img" />
        </div>
    )
}

export default Work;