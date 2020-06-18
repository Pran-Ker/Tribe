import React from "react";
import {connect} from "react-redux";
import axios from "axios";

import {authDetails} from '../../../../redux/auth/auth-action';
import {closeModal} from '../../../../redux/modal/modal-action';

import './PostingModal.css';

class PostingModal extends React.Component{
    state={
        post: '',
        skills: '',
        description: ''
    }

    componentDidMount(){
        let {auth, authFunction} = this.props;
    }

    onModalSubmit = () => {
        let {closeModalFunc} = this.props
        console.log(this.props)

        const input_data={
            id_user:this.props.id_user,
            position:this.state.post,
            skills:this.state.skills,
            desc:this.state.description
        }

        axios.post("https://tribe-test-server-v1.herokuapp.com/job_post",input_data).then((res)=>{
            if(res.error)
            {
                console.log("Tech error");
            }
            else
            {
                console.log(res.data);
            }
        })

        closeModalFunc()
    }

    onChangeHandler = (event, type) => {
        let prevState = {...this.state}
        prevState[type] = event.target.value;
        console.log(prevState)
        this.setState(prevState)
    }

    render(){
        let modal;
        if(this.props.display){
            modal = <div className="PostingModal">
                        <form className="PostingModal--Form" onSubmit={this.onModalSubmit} >
                            <div className="PostingModal--Group">
                                <label className="PostingModal--Label">Mention the post</label>
                                <input className="PostingModal--Input" value={this.state.post} type="text" 
                                        onChange={e => this.onChangeHandler(e,'post')} required/>
                            </div>
                            <div className="PostingModal--Group">
                                <label className="PostingModal--Label">Add the skills</label>
                                <input className="PostingModal--Input" value={this.state.skills} type="text" 
                                        onChange={e => this.onChangeHandler(e,'skills')} required/>
                            </div>
                            <div className="PostingModal--Group">
                                <label className="PostingModal--Label">description</label>
                                <textarea className="PostingModal--Textarea" value={this.state.description} rows="7"
                                        onChange={e => this.onChangeHandler(e,'description')} required/>
                            </div>

                            <input type="submit" value="post" className="PostingModal--Submit" />
                        </form>
                    </div>
        }
        else{
            modal = null
        }
        return(
            modal
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth.auth
})

const mapDispatchToProps = dispatch => ({
    authFunction: data => dispatch(authDetails(data)),
    closeModalFunc: () => dispatch(closeModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(PostingModal);