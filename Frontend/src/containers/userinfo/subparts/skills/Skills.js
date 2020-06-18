import React from "react";
import queryString from 'query-string';
import Select from 'react-select';

import {connect} from "react-redux";
import {authDetails} from '../../../../redux/auth/auth-action';
import axios from "axios";
import auth from '../../../../auth/auth';
import SideContent from '../sideContent/SideContent';
import Input from '../../../../components/input/Input';
import SkillsTag from './skillsContainer/skillsContainer';

class Skills extends React.Component{

    state = {
        options : [
            { value: 'UI/UX', label: 'UI/UX' },
            { value: 'Illustrator', label: 'Illustrator' },
            { value: 'Photoshop', label: 'Photoshop' },
            { value: 'Indesign', label: 'Indesign' },
            { value: 'AfterEffects', label: 'After Effects' },
            { value: 'Figma', label: 'Figma' },
            { value: 'Xd', label: 'Xd' },
          ],
        selectedOption: null,
        skills: []
    }

    componentDidMount(){
        let {authFunction} = this.props;
        if(this.props.auth.error=="logged_out")
        {
            authFunction({error:"logged_out"})
            return this.props.history.push({
                pathname: '/user'
            })
        }
        const result=auth(this.props.auth);
        result.then((res)=>{
            if(res.auth=="denied")
            {
                authFunction(res)
                this.props.history.push({
                    pathname: '/user',
                })
            }
        })

    }

    handleChange = selectedOption => {
        let {skills} = this.state
        let index = skills.includes(selectedOption.value)
        if(!index){
            skills.push(selectedOption.value)
        }
        this.setState({ selectedOption: selectedOption, skills: skills }, () => console.log(this.state));
      };

    onRemoveSkills = (event,skill) => {
        event.preventDefault()
        let {skills} = this.state
        let index = skills.indexOf(skill)
        skills.splice(index,1)
        this.setState({skills: skills})
    }

    onPreviousHandler = (event) => {
        event.preventDefault();
        this.props.history.goBack()
    }

    onSubmitSkills=(e)=>{
        e.preventDefault();
        let {auth, authFunction} = this.props
        const data={
            skills: this.state.skills,
            id_user:auth.id_user
        }

        axios.post('https://tribe-test-server-v1.herokuapp.com/userpf/skills', data)
            .then(res => {
                if(res.data.result=="added")
                {
                    this.props.history.push({
                        // pathname: '/userinfo/dopelogo',
                        pathname: '/userinfo/pic'
                    })
                }
                else
                {
                    const extra_details={
                        id_user:auth.id_user,
                        token:auth.token,
                        error:res.data.result
                    }
                    authFunction(extra_details)
                    this.props.history.push({
                        pathname: '/userinfo'
                    })
                }
        })  
    }

    render(){
        let {selectedOption, options, skills} = this.state
        return(
            <div className="UserInfo">
                <SideContent />
                <div className="UserInfo--Div2">
                    <form className="UserInfo--Div2Container" onSubmit={this.onSubmitSkills}>
                        <h1 className="UserInfo--Div2Heading">Add your skills</h1>
                        <p className="UserInfo--Div2Para">Add here what you’re good at and what you’ve done in the past</p>

                        <Select className="UserInfo--Div2Select"
                                value={selectedOption}
                                onChange={this.handleChange}
                                options={options}
                            />
                        
                        <div className="UserInfo--Div2SkillsTag">
                            {
                                skills.map((opt, idx) => {
                                    return(
                                        <SkillsTag skill={opt} key={idx} clicked={e => this.onRemoveSkills(e,opt)} />
                                    )
                                })
                            }
                        </div>
        
                        <button className="UserInfo--NextInfo" type="submit">Next &rarr;</button>
                    </form>

                    <a className="UserInfo--BackInfo" onClick={event => this.onPreviousHandler(event)}>&larr; Back</a>
                    
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth.auth,
})

const mapDispatchToProps = dispatch => ({
    authFunction: data => dispatch(authDetails(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Skills);