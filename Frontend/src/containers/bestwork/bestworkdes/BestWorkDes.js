import React from "react";
import {withRouter} from 'react-router-dom';
import auth from '../../../auth/auth';
import SideContent from '../sidecontent/SideContent';
import UploadBtn from './uploadbtn/UploadBtn';
import {connect} from "react-redux";
import {authDetails} from '../../../redux/auth/auth-action';
import axios,{ post } from "axios";

import './BestWorkDes.css';

class BestWorkDes extends React.Component{
    
    constructor(props){
        super(props);
        this.state ={
          file: [],
          imgs: []
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
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

    }

    onFormSubmit(e){
        if(this.state.file.length>0)
        {
            let {auth, authFunction} = this.props
            e.preventDefault()
            console.log(this.state.file);
            this.fileUpload(this.state.file).then((response)=>{
                console.log(response.data);
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
                        pathname: '/dashboard',
                        search: '?page=1&limit=5'
                    })
                    console.log(auth);
                }
            })
        }
        else
        {
            //give error
            console.log("no files chosen");
        }
    }

    onChange(e) {
        let {file, imgs} = this.state;
        file.push(e.target.files[0])
        let reader = new FileReader();
        let fileImg = e.target.files[0];
        reader.onload = () => {
            imgs.push(reader.result)
            this.setState({
              file: file,
              imgs: imgs
            }, () => console.log(this.state));
          }
        reader.readAsDataURL(fileImg)
    }

    fileUpload(file){
        console.log(file);
        let {auth} = this.props
        const url = 'https://tribe-test-server-v1.herokuapp.com/uploadBestWorks';
        console.log(file)
        const formData = new FormData();
        formData.append('id_user',auth.id_user)
        var i=0;
        for(i=0;i<file.length;i++)
        {
            formData.append('bestWorks',file[i]);
        }

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'id_user':auth.id_user
            }
        }
        return post(url, formData,config)
    }

    render(){
        let btn;
        return(
            <div className="BestWorkDes">
                <SideContent title="Upload your best works!" />
                <div className="BestWorkDes--Upload">
                    <form className="BestWorkDes--Form" onSubmit={this.onFormSubmit}>
                        <div className="BestWorkDes--UploadImgs">
                            {
                                this.state.imgs.map((obj, idx) => {
                                    return(
                                        <img key={idx} className="BestWorkDes--UploadImg" src={obj} alt="UploadImg" />
                                    )
                                })
                            }
                        </div>
                        <div>
                            <label htmlFor="bestworkdes__img" style={{display: 'inline-block'}}><UploadBtn /></label>
                            <input id="bestworkdes__img" type="file" className="BestWorkDes--Input" name="bestWork" onChange={this.onChange} />
                        </div>
                        <button className="BestWorkDes--Btn" type='submit'>Upload &rarr;</button>
                    </form>
                    
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BestWorkDes));