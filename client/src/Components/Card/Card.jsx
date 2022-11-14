import React from "react";
import "./Card.css";

const Card = ({ name, image, type }) => {
  return (
    <div className="card">
      <h3>{name}</h3>
      <img className="img" src={image} alt="Not found" />
      <h2>{type}</h2>
    </div>
  );
};

export default Card;
