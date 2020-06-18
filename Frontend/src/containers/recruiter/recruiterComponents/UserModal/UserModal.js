import React from "react";
import {connect} from "react-redux";

import {authDetails} from '../../../../redux/auth/auth-action';
import {closeModal} from '../../../../redux/modal/modal-action';

import './UserModal.css';

class UserModal extends React.Component{

    state={
        Email: '',
        Name: '',
        ContactNum: '',
        Password: ''
    }

    componentDidMount(){
        let {auth, authFunction} = this.props;
    }

    onModalSubmit = () => {
        let {closeModalFunc} = this.props
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
            modal = <div className="UserModal">
                        <h1 className="UserModal--Heading">Add A Member</h1>
                        <form className="UserModal--Form" onSubmit={this.onModalSubmit} >
                            <div className="UserModal--Group">
                                <label className="UserModal--Label">Email</label>
                                <input className="UserModal--Input" value={this.state.Email} type="email" 
                                        onChange={e => this.onChangeHandler(e,'Email')} />
                            </div>
                            <div className="UserModal--Group">
                                <label className="UserModal--Label">Name</label>
                                <input className="UserModal--Input" value={this.state.Name} type="text" 
                                        onChange={e => this.onChangeHandler(e,'Name')} />
                            </div>
                            <div className="UserModal--Group">
                                <label className="UserModal--Label">Contact Number</label>
                                <input className="UserModal--Input" value={this.state.ContactNum} type="text" 
                                        onChange={e => this.onChangeHandler(e,'ContactNum')} />
                            </div>
                            <div className="UserModal--Group">
                                <label className="UserModal--Label">Password</label>
                                <input className="UserModal--Input" value={this.state.Password} type="text" 
                                        onChange={e => this.onChangeHandler(e,'Password')} />
                            </div>

                            <input type="submit" value="Add" className="UserModal--Submit" />
                        </form>
                    </div>
        }
        else{
            modal = null;
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

export default connect(null, mapDispatchToProps)(UserModal);