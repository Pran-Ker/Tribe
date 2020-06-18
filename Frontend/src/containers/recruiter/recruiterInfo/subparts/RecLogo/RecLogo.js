import React from "react";
import {connect} from "react-redux";
import axios,{ post } from "axios";
import {authDetails} from '../../../../../redux/auth/auth-action';
import auth_rec from '../../../../../auth/auth_rec';

class RecLogo extends React.Component{

    constructor(props){
        super(props);
        this.state ={
          file:null
        }
        this.onSubmitLogo = this.onSubmitLogo.bind(this)
        this.onChange = this.onChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
    }

    onPreviousHandler = (event) => {
        event.preventDefault();
        this.props.history.goBack()
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

    onSubmitLogo(e){
        let {auth, authFunction} = this.props
        e.preventDefault()
        console.log(this.state.file);
        this.fileUpload(this.state.file).then((response)=>{
            if(response.data.error)
            {
                const extra_details={
                    id_user:auth.id_user,
                    token:auth.token,
                    error:response.data.error
                }
                authFunction(extra_details)
                this.props.history.push({
                    pathname: '/recinfo',
                })
            }
            else
            {
                console.log(this.props.auth);
                this.props.history.push({
                    pathname: '/recdashboard'
                })
                console.log(auth);
            }
        })
    }

    onChange(e) {
        this.setState({file:e.target.files[0]})
    }

    fileUpload(file){
        let {auth, authFunction} = this.props
        const url = 'https://tribe-test-server-v1.herokuapp.com/rec_info_logo';
        const formData = new FormData();
        formData.append('reclogo',file)
        formData.append('id_user',auth.id_user)
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'id_user':auth.id_user
            }
        }
        return post(url, formData,config)
    }


    render(){
        return(
            <div className="RecInfo--Right">
                <form className="RecInfo--RightContainer" onSubmit={this.onSubmitLogo}>
                    <h1 className="RecInfo--RightHeading">Company's Logo</h1>
                    <input type="file" onChange={this.onChange} name="reclogo"/>
                    <button className="RecInfo--NextInfo" type="submit">Next &rarr;</button>
                </form>
                <a className="RecInfo--BackInfo" onClick={event => this.onPreviousHandler(event)}>&larr; Back</a>
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

export default connect(mapStateToProps, mapDispatchToProps)(RecLogo);