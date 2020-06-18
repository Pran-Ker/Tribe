import React from "react";

import Work from './work/Work';
import Skill from './skill/skill';
import Inspiration from './inspiration/Inspiration';

import "./Features.css";

class Features extends React.Component {

    state={
        work: true,
        skill: false,
        inspiration: false
    }

    onClickHandler = (event, type) => {
        let {work, skill, inspiration} = this.state
        if(type === "work"){
            work = true
            skill = false
            inspiration = false
            this.setState({work, skill, inspiration})
        }
        else if(type === "skill"){
            work = false
            skill = true
            inspiration = false
            this.setState({work, skill, inspiration})
        }
        else{
            work = false
            skill = false
            inspiration = true
            this.setState({work, skill, inspiration})
        }
    }

    render(){
        let {work, skill, inspiration} = this.state;
        let content;

        if(work){
            content = <Work />
        }
        else if(skill){
            content = <Skill />
        }
        else if(inspiration){
            content = <Inspiration />
        }
        else{
            content = null
        }
        return(
            <div className="Features" id="features">
                <div className="Features--Options">
                    <h1 className={`Features--Option ${this.state.work ? 'Features--Underline' : '' }`}  onClick={e => this.onClickHandler(e,"work")}>Work analysis</h1>
                    <h1 className={`Features--Option ${this.state.skill ? 'Features--Underline' : '' }`} onClick={e => this.onClickHandler(e,"skill")}>Skill overview</h1>
                    <h1 className={`Features--Option ${this.state.inspiration ? 'Features--Underline' : '' } `} onClick={e => this.onClickHandler(e,"inspiration")}>Get Inspiration</h1>
                </div>
                {content}
            </div>
        )
    }
}

export default Features;