import React from "react";

import './Btn.css';

const Btn = (props) => {
    return(
        <div className={`${props.dark ? 'Btn--Dark' : 'Btn--Light'} Btn`}>{props.title}</div>
    )
}

export default Btn;