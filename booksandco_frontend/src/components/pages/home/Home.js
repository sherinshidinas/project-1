import React from "react";
import Banner from "./banner/Banner";
import Trending from "./now-trending/Trending";
import Offer from "./offer-post/Offer";

import Header from '../../header/Header'
import Footer from '../../footer/Footer'
import Newreleased from "./new-released/Newreleased";
import { AllData } from "../../../context/DataContext";
import BestSellers from "./BestSellers.js/BestSellers";
import Loader from "./loader/Loader";

const Home = () => {

  return <div>
    
        <Header/>
        <Banner/>
       
        <Offer/>

        <AllData>
        
        <Newreleased/>
        <BestSellers/>
        <Trending/>
        
        </AllData>
       
       
        <Footer/> 


  </div>;
};

export default Home;
