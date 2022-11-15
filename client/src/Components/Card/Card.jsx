import React from "react";
import "./Card.css";

const Card = ({ name, image, type }) => {
  return (
    <div className="card">
      <h3>{name.toUpperCase()}</h3>
      <img
        className="img"
        src={
          image
            ? image = image
            : (image =
              "https://giffiles.alphacoders.com/212/212514.gif")
        }
        alt="Not found"
        width="175px"
        height="100px"
        
      />
      <h2>{type[0].toUpperCase()}</h2>
    </div>
  );
};

export default Card;
