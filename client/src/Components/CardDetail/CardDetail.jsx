import React from "react";
import { getDetail, clearDetail } from "../../redux/actions";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "./CardDetail.css";

const CardDetail = (props) => {
  const dispatch = useDispatch();

  // props.match.params.id
  const params = useParams();
  console.log(params)
  const { id } = params;
  const history = useHistory();
  console.log(history)

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  const myPokemon = useSelector((state) => state.detail);
  console.log(myPokemon)

  function handleBack(event) {
    event.preventDefault();
    dispatch(clearDetail());
    history.push("/home");
  }

  return (
    <div>
      {myPokemon.length > 0 ? (
        <div className="cardD">
          <h2>
            {myPokemon[0].name.toUpperCase()}
          </h2>

          <img
            src={
              myPokemon[0].image
                ? myPokemon[0].image
                : (myPokemon.img =
                    "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/f/f8/latest/20150711053154/EE14_Pok%C3%A9_Ball.png/220px-EE14_Pok%C3%A9_Ball.png")
            }
            alt="Not found"
            width="200px"
            height="300px"
          />

          <h3>
            Types:  
              {!myPokemon[0].createdInDb
              ? myPokemon[0].type + " "
              : myPokemon[0].Types.map((pokemon) => pokemon.name + " ,")}
          </h3>

          <h4>
            Health: <span>{myPokemon[0].health}</span>
          </h4>
          <h4>
            Attack: <span>{myPokemon[0].attack}</span>
          </h4>
          <h4>
            Defense: <span>{myPokemon[0].defense}</span>
          </h4>
          <h5>
            Height: <span>{myPokemon[0].height}</span>
          </h5>
          <h5>
            Weight: <span>{myPokemon[0].weight}</span>
          </h5>
        </div>
      ) : (
        <p>Loading... </p>
      )}

      <button className="btn" onClick={(event) => handleBack(event)}>
        Back
      </button>
    </div>
  );
};

export default CardDetail;
