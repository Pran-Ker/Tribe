import React from "react"

import HeadingStyle from '../heading/Heading';

import './TopCompany.css';

const TopCompany = (props) => {
    return(
        <div className="TopCompany">
            <HeadingStyle title="Top Companies" />
            <div className="TopCompany--Table">

            </div>
            <button className="TopCompany--Apply">Apply</button>
        </div>
    )
}

export default TopCompany;