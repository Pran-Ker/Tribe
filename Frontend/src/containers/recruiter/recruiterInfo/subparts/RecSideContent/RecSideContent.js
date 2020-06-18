import React from "react";

import tribelogo from '../../../../../images/tribelogo.png';

const RecSideContent = () => {
    return(
        <div className="RecInfo--Left">
            <img src={tribelogo} className="RecInfo--Logo" />
            <h1 className="RecInfo--LeftText">Review and edit your info</h1>
        </div>
    )
}

export default RecSideContent;