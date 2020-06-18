import React from "react";
import {withRouter} from "react-router-dom";
import queryString from 'query-string';
import tribelogo from '../../../../images/tribelogo.png';

class SideContent extends React.Component{

    onBackHandler = () => {
        const params = queryString.parse(this.props.location.search);
        this.props.history.push({
            pathname: '/getstarted',
            state: { detail: this.props.location.state.detail }
        })
    }

    render(){
            return(
                <div className="UserInfo--Div1">
                    <img src={tribelogo} className="UserInfo--Logo" />
                    <h1 className="UserInfo--Div1Text">Review and edit your info</h1>
                    <a onClick={this.onBackHandler} className="UserInfo--Back">&larr; Back</a>
                </div>
            )
    }
}

export default withRouter(SideContent);