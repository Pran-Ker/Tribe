import React from "react";

import InspirationCard from './inspirationcard/InspirationCard';

import xd from '../../../../images/xdpic.png';
import ps from '../../../../images/pspic.png';
import ai from '../../../../images/ai.png';
import './Inspiration.css';

const Inspiration = () => {
    return(
        <div className="Inspiration">
            <h1 className="Inspiration--Title">Look where you stand in the league. Gain inspiration, gain experience by seeing what others do.</h1>
            <div className="Inspiration--Cards">
                <InspirationCard img={xd} />
                <InspirationCard img={ps} />
                <InspirationCard img={ai} />
            </div>
        </div>
    )
}

export default Inspiration;