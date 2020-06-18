import React from "react";
import {Switch, Route} from "react-router-dom";

import RecAbout from './subparts/RecAbout/RecAbout';
import RecName from './subparts/RecName/RecName';
import RecLogo from './subparts/RecLogo/RecLogo'; 
import RecSideContent from './subparts/RecSideContent/RecSideContent';

import './RecruiterInfo.css';

class RecruiterInfo extends React.Component{
    render(){
        return(
            <div className="RecInfo">
                <RecSideContent />
                <Switch>
                    <Route path="/recinfo/about" component={RecAbout} />
                    <Route path="/recinfo/logo" component={RecLogo} />
                    <Route path="/" component={RecName} />
                </Switch>
            </div>
        )
    }
}

export default RecruiterInfo;