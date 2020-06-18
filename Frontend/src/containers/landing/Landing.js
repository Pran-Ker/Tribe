import React from "react";

import Home from './home/Home'
import ForUser from './forUser/ForUser'
import Features from './features/Features';
import ForCompany from './forCompany/ForCompany';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

const Landing = () => {
    return(
        <div>
            <Navbar />
            <Home />
            <ForUser />
            <Features />
            <ForCompany />
            <Footer />
        </div>
    )
}

export default Landing;