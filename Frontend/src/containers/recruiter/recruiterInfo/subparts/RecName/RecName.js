import React from "react";
import {connect} from "react-redux";
import axios from "axios";

import {authDetails} from '../../../../../redux/auth/auth-action';
import auth_rec from '../../../../../auth/auth_rec';
import Input from '../../../../../components/input/Input';

class RecName extends React.Component{

    state = {
        Name: {
            elementType : 'input',
            elementConfig : {
                placeholder : 'Name of the company',
                cols: '50',
                rows: '3',
                name:"about",
                required:true
            },
            value: '',
        }
    }

    componentDidMount() {
        let {auth, authFunction} = this.props;
        console.log(this.props.auth);
        if(this.props.auth.error=="logged_out")
        {
            authFunction({error:"logged_out"})
            return this.props.history.push({
                pathname: '/user'
            })
        }
        const result=auth_rec(this.props.auth);
        result.then((res)=>{
            console.log(res);
            if(res.auth=="denied")
            {
                authFunction(res)
                this.props.history.push({
                    pathname: '/user',
                })
            }
        })
    }

    onChangeHandler = (event) => {
        let userInputData = this.state.Name
        userInputData.value = event.target.value;
        this.setState({Name: userInputData}, () => console.log(this.state))
    }

    onSubmitName = (e) => {
        e.preventDefault()
        // this.props.history.push({pathname: '/recinfo/about'})
        let {auth, authFunction} = this.props
        
        const data={
            company_name: this.state.Name.value,
            id_user:auth.id_user
        }

        axios.post('https://tribe-test-server-v1.herokuapp.com/rec_info/name', data)
            .then(res => {
                console.log(res.data);
                if(res.data.result=="added")
                {
                    this.props.history.push({
                        pathname: '/recinfo/about',
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
                        pathname: '/recinfo',
                    })
                }
        })  
    }

    render(){
        return(
            <div className="RecInfo--Right">
                <form className="RecInfo--RightContainer" onSubmit={this.onSubmitName}>
                    <h1 className="RecInfo--RightHeading">Company's Name</h1>

                    <Input  light
                            type = {this.state.Name.elementType}
                            elementConfig = {this.state.Name.elementConfig}
                            value = {this.state.Name.value}
                            changed = {(event => this.onChangeHandler(event))}
                    />
                    <button className="RecInfo--NextInfo" type="submit">Next &rarr;</button>
                </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(RecName);