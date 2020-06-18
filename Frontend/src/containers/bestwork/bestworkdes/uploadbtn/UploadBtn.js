import React from "react";

import plus from '../../../../images/plus.svg';
import './UploadBtn.css';

const UploadBtn = (props) => {
    return(
        <div className="UploadBtn">
            <img src={plus} alt="plus" className="UploadBtn--Plus" />
        </div>
    )
}

export default UploadBtn;