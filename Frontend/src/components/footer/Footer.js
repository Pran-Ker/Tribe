import React from "react";

import tribelogo from '../../images/tribelogo.png';
import insta from '../../images/instagram.png';
import linkedin from '../../images/linkedin.png';
import discord from '../../images/discord.png';
import './Footer.css';

const Footer = () => {
    return(
        <div className="Footer" id="contactus">
            <div className="Footer--Links">
                <div className="Footer--LinksFirst">
                    <h1 className="Footer--Heading">Company</h1>
                    <h1 className="Footer--Subheading">How it works</h1>
                    <h1 className="Footer--Subheading">Leaderboard</h1>
                    <h1 className="Footer--Subheading">About Us</h1>
                    <h1 className="Footer--Subheading">Job Board</h1>
                </div>

                <div className="Footer--LinksSecond">
                    <h1 className="Footer--Heading">Support</h1>
                    <h1 className="Footer--Subheading">Login / Signup</h1>
                    <h1 className="Footer--Subheading">FAQ</h1>
                </div>
            </div>

            <div className="Footer--Social">
                <img src={tribelogo} className="Footer--SocialLogo" alt="logo" />
                <div className="Footer--SocialLinks">
                    <img src={insta} className="Footer--SocialLinksImg" alt="insta" />
                    <img src={linkedin} className="Footer--SocialLinksImg" alt="linkedin" />
                    <img src={discord} className="Footer--SocialLinksImg" alt="discord" />
                </div>
            </div>
        </div>
    )
}

export default Footer;