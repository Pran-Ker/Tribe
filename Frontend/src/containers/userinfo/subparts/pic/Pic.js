import React from "react";
import {connect} from "react-redux";
import {authDetails} from '../../../../redux/auth/auth-action';
import axios,{ post } from "axios";
import SideContent from '../sideContent/SideContent';
import auth from '../../../../auth/auth';

class Pic extends React.Component{

    constructor(props){
        super(props);
        this.state ={
          file:null
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
    }

    componentDidMount(){

        let {authFunction} = this.props;
        console.log(this.props.auth);
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

    onPreviousHandler = (event) => {
        event.preventDefault();
        this.props.history.goBack()
    }

    onFormSubmit(e){
        let {auth, authFunction} = this.props
        e.preventDefault()
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
                    pathname: '/userinfo/pic',
                })
            }
            else
            {
                console.log(this.props.auth);
                this.props.history.push({
                    pathname: '/bestwork'
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
        const url = 'https://tribe-test-server-v1.herokuapp.com/upload/pic';
        const formData = new FormData();
        formData.append('mylogo',file)
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
            <div className="UserInfo">
                <SideContent />
                <div className="UserInfo--Div2">
                    <form className="UserInfo--Div2Container" onSubmit={this.onFormSubmit}>
                        <h1 className="UserInfo--Div2Heading">A photo of you</h1>
                        <p className="UserInfo--Div2Para">One with the best smile!</p>
                        <input type="file" className="UserInfo--Div2PhotoUpload" name="mylogo" onChange={this.onChange} required/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Pic);