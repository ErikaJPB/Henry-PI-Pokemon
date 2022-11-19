import React from "react";
import "./Card.css";
import { Link } from "react-router-dom"

const Card = ({ name, image, type, id }) => {
  return (
    <div className="card">
    <Link to = {`/pokemon/${id}`}>
      <h3>{name[0].toUpperCase() + name.substring(1)}</h3>
      </Link>
      <img
        className="img"
        src={
          image
            ? (image = image)
            : (image =
                "https://external-preview.redd.it/SbiB64fgeEMoGhPH4Us5Ou7K6GH8LmDsZ70lvlrO_W8.jpg?auto=webp&s=9cee852d42920fdf4d83b5a52ab90fe05b8f7c25")
        }
        alt="Not found"
        width="175px"
        height="100px"
      />
      <h3>Type: {type}</h3>
    </div>
  );
};

export default Card;
