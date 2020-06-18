import React from 'react';

import cross from '../../../../../images/cross.svg'
import './skillsContainer.css';

const SkillsTag = (props) => {
    return(
        <div className="Skills">
            <h1 className="Skills--Heading">{props.skill}</h1>
            <img src={cross} alt="Cross" onClick={props.clicked} className="Skills--Img" />
        </div>
    )
}

export default SkillsTag;