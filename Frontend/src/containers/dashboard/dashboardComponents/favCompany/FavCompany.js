import React from "react";

import HeadingStyle from '../heading/Heading';
import FavCompanyCard from './favCompanyCard/FavCompanyCard';

import './FavCompany.css';

const FavCompany = (props) => {
    return(
        <div className="FavCompany">
            <HeadingStyle title="Companies you'd love" />
            <div className="FavCompany--Cards">
                <FavCompanyCard />
                <FavCompanyCard />
                <FavCompanyCard />
            </div>
            <button className="FavCompany--Apply">Apply</button>
        </div>
    )
}

export default FavCompany;