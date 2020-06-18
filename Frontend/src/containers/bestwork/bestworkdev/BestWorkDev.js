import React from "react";
import {withRouter} from 'react-router-dom';
import auth from '../../../auth/auth';
import axios from "axios";
import randomcolor from 'randomcolor';
import queryString from 'query-string';
import {connect} from "react-redux";
import {authDetails} from '../../../redux/auth/auth-action';

import SideContent from '../sidecontent/SideContent';
import RepoCard from './repocard/RepoCard';


import gitpic from '../../../images/gitcolor.svg';
import './BestWorkDev.css';


class BestWorkDev extends React.Component{
    
    state= {
        username: false,
        repos: [],
        github: '',
        selected: []
    }

    componentDidMount(){
        let {authFunction} = this.props;
        let params = queryString.parse(location.search);
        // console.log(params);
        if(this.props.auth.error=="logged_out")
        {
            authFunction({error:"logged_out"})
            return this.props.history.push({
                pathname: '/user'
            })
        }
        const result = auth(this.props.auth);
        result.then((res)=>{
            if(res.auth=="denied")
            {
                authFunction(res)
                return this.props.history.push({
                    pathname: '/user'
                })
            }
        })
        // console.log(this.props.auth.id_user);
        if(params.code)
        {
            const client_id='70fd5592f86f8ba75ae0';
            const secret_id='e1867cc89cd82d3eaee3c815ba81db2e58ba7db5';

            const creds={
                id_user:this.props.auth.id_user,
                client_id:client_id,
                secret_id:secret_id,
                code:params.code
            }

            axios.post("https://tribe-test-server-v1.herokuapp.com/oauth",creds).then((res)=>{
                if(res.data.profile_exist)
                {
                    this.setState({github: res.data.login, repos: res.data.repos_data, username: true},() => console.log(this.state))
                }
                this.setState({github: res.data.login, repos: res.data.repos_data, username: true},() => console.log(this.state))
            })
        }

    }

    onSelectHandler = (event, reponame) => {
        event.preventDefault();
        let {selected} = this.state
        let index = null
        index = selected.indexOf(reponame)
        if(index === -1 && selected.length < 5){
            selected.push(reponame)
        }
        else{
            selected.splice(index, 1)
        }
        this.setState({selected}, () => console.log(this.state))
    }

    onNextHandler = () => {
        if(this.state.selected.length<=5 && this.state.selected.length>0)
        {
            // this.props.history.push({pathname: '/dashboard'})
            // this.state.selected gives you the name of selected repositories
            let {auth, authFunction} = this.props
            console.log(auth.id_user)
            const get_data={
                id_user:auth.id_user
            }
            axios.post('https://tribe-test-server-v1.herokuapp.com/gitreps',get_data).then((res)=>{
                console.log(res.data)
                console.log(this.state.selected)
                const data={
                    access_token:res.data.password,
                    best_repos:this.state.selected
                }
                console.log(data)
                axios.post('http://127.0.0.1:5000/gitscore', data)
                    .then(res => {
                        console.log(res.data)
                        const git_score = {
                            id_user:auth.id_user,
                            git_score:res.data.tribe_score
                        }

                        axios.post("https://tribe-test-server-v1.herokuapp.com/git_score",git_score).then((res)=>{
                            console.log(res.data);

                            if(res.data.error)
                            {
                                console.log("tech issue");
                            }
                            else
                            {
                                this.props.history.push({
                                    pathname: '/dashboard',
                                })
                            }
                        })
                        //res.data contains the github score   
                }) 
            })
        }
        else
        {
            //give error
            console.log("Select less than or equal to 5 repos.")
        }
        

    }

    render(){

        let content, buttonNext;

        if(this.state.selected.length === 5){
            // buttonNext = <button className="BestWorkDev--Btn" onClick={this.onNextHandler}>Next &rarr;</button>
        }
        else{
            buttonNext = null
        }

        if(this.state.username){
            content = <div className="BestWorkDev--Repositories">
                <div className="BestWorkDev--RepoContainer">
                    {
                        this.state.repos.map(repo => {
                            let highlight = null;
                            let {selected} = this.state;
                            highlight = selected.indexOf(repo)
                            if(highlight !== -1){
                                return(
                                    <RepoCard title={repo} current clicked={e => this.onSelectHandler(e,repo)} />
                                )   
                            }
                            else{
                                return(
                                    <RepoCard title={repo} clicked={e => this.onSelectHandler(e,repo)} />
                                )
                            }
                        })
                    }
                </div>
                <button className="BestWorkDev--Btn" onClick={this.onNextHandler}>Next &rarr;</button>
            </div>

        }
        else{
            content = <div className="BestWorkDev--Username">
                <div className="BestWorkDev--UserContainer">
                    <img src={gitpic} alt="github" className="BestWorkDev--Pic"/>
                    <form onSubmit={this.onClickGithub}>
                        <a className="BestWorkDev--Authorize" href="https://github.com/login/oauth/authorize?client_id=70fd5592f86f8ba75ae0">Authenticate GitHub</a>
                    </form>
                </div>
            </div>
        }

        return(
            <div className="BestWorkDev">
                <SideContent title="choose 5 of your best repositories!" />
                {content}
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BestWorkDev));