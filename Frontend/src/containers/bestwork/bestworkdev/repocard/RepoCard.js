import React from "react"

import './RepoCard.css';

class RepoCard extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        let props = this.props
        return(
            <div className={`${props.current ? 'RepoCard--Current' : ''} RepoCard`} onClick={this.props.clicked}>
                <h1 className="RepoCard--Title">{props.title}</h1>
                {/* <h1 className="RepoCard--Description">{props.description}</h1>
                <h1 className="RepoCard--Lang">{props.lang}</h1> */}
            </div>
        )
    }

}

export default RepoCard;