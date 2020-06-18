import React from "react";
import {connect} from "react-redux"

import {closeModal} from '../../redux/modal/modal-action';

import './Backdrop.css';

const Backdrop = (props) => {
    let {closeModalFunc} = props
    let backdrop;
    if(props.display){
        backdrop = <div className="Backdrop" onClick={() => closeModalFunc()}>

        </div>
    }
    else{
        backdrop = null
    }
    return(
        backdrop
    )
}

const mapDispatchToProps = dispatch => ({
    closeModalFunc: () => dispatch(closeModal())
})

export default connect(null, mapDispatchToProps)(Backdrop);