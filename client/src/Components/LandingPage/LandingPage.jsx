import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
 

  return (
    <div className="landing-container">
    <h1> Welcome to the Pokémon World !</h1>
    <Link to ="/home"> 
    <button className=" landing-btn">
    ENTER
    </button></Link>
    </div>
    
  );
};

export default LandingPage;
