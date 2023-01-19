import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";

const Card = ({ name, image, type, id }) => {
  return (
    <div className="card">
      <Link to={`/pokemon/${id}`}>
        <h3>{name[0].toUpperCase() + name.substring(1)}</h3>
      </Link>
      <img
        className="img"
        src={
          image
            ? (image = image)
            : (image =
                "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/800px-Pokebola-pokeball-png-0.png")
        }
        alt="Not found"
        width="175px"
        height="100px"
      />
      <h3 className="type-title">Type: {type}</h3>
    </div>
  );
};

export default Card;
