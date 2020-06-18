import React from "react";

import SkillCard from './skillcard/SkillCard';

import xd from '../../../../images/xdpic.png';
import ps from '../../../../images/pspic.png';
import ai from '../../../../images/ai.png';
import './skill.css';

const Skill = () => {
    return(
        <div className="Skill">
            <h1 className="Skill--Title">We provide an analysis on how proficient are you in a particular skill, and say more about your habits and preferences.</h1>
            <div className="Skill--Cards">
                <SkillCard img={ps} num="45879" num2="3549684" />
                <SkillCard img={xd} num="45879" num2="3549684" />
                <SkillCard img={ai} num="45879" num2="3549684" />
            </div>
        </div>
    )
}

export default Skill;