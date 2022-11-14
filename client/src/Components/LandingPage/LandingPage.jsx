import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
 

  return (
    <div className="landing">
    <h1 className="font-face-ps"> Welcome to the Pokémon World !</h1>
    <Link to ="/home"> 
    <button className="btn">
    Gotta catch 'em all!
    </button></Link>
    </div>
  );
};

export default LandingPage;
