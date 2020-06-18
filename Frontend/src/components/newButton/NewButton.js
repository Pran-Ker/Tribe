import React from "react";

import './NewButton.css';

const NewButton = (props) => {
    const {small,light,white,transparent} = props
    return(
        <button className={`${small ? "NewButton--Small" : "NewButton--Large"} ${light ? "NewButton--Light" : "NewButton--Dark"} 
        ${white ? "NewButton--White" : ""} ${transparent ? "NewButton--Transparent" :""} NewButton`} style={{marginTop: props.margintop}} onClick={props.clicked}>{props.children}</button>
    )
}

export default NewButton;