import React from "react";

import Btn from '../Btn/Btn';

import './HomeCard.css';

const HomeCard = (props) => {
    let chat;
    if(props.chat){
        chat = <Btn title="Tribe chat" dark />
    }
    else{
        chat= null
    }
    return(
        <div className="HomeCard">
            <h1 className="HomeCard--Title">{props.name}</h1>
            <h1 className="HomeCard--Title">{props.post}</h1>
            <Btn title="Tribe profile" light />
            {chat}
        </div>
    )
}

export default HomeCard;