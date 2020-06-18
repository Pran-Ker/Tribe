import React from "react";

import './SkillCard.css';

const SkillCard = (props) => {
    return(
        <div className="SkillCard">
            <img src={props.img} className="SkillCard--Img" alt="Skill" />
            <div className="SkillCard--TextContainer">
                <div className="SkillCard--Text">
                    <h1 className="SkillCard--Title">India</h1>
                    <h1 className="SkillCard--Number">{props.num}</h1>
                </div>
                <div className="SkillCard--Text">
                    <h1 className="SkillCard--Title">World</h1>
                    <h1 className="SkillCard--Number">{props.num2}</h1>
                </div>
            </div>

        </div>
    )
}

export default SkillCard;