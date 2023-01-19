import React from "react";
import { getDetail, clearDetail } from "../../redux/actions";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "./CardDetail.css";
import Loading from "../Loading/Loading";

const CardDetail = (props) => {
  const dispatch = useDispatch();

  // props.match.params.id
  /* Getting the id from the url. */
  const params = useParams();
  console.log(params);
  const { id } = params;
  const history = useHistory();

  /* A hook that is called when the component is mounted. It is used to dispatch the clearDetail and
  getDetail actions. */
  useEffect(() => {
    dispatch(clearDetail());
    dispatch(getDetail(id));
  }, [dispatch, id]);

  /* Getting the data from the redux store. */
  const myPokemon = useSelector((state) => state.detail);

  /**
   * This function is called when the user clicks the back button on the detail page. It prevents the
   * default action of the back button, clears the detail page, and then pushes the user back to the
   * home page.
   */
  function handleBack(event) {
    event.preventDefault();
    dispatch(clearDetail());
    history.push("/home");
  }

  return (
    <div className="container-detail">
      {myPokemon.length > 0 ? (
        <div className="cardD">
          <h2>{myPokemon[0].name.toUpperCase()}</h2>

          <img
            className="img"
            src={
              myPokemon[0].image
                ? myPokemon[0].image
                : (myPokemon.img =
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/800px-Pokebola-pokeball-png-0.png")
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
          <div className="statsOne">
            <div className="statsBackground">
              <h4>
                ❤️ Health: <span>{myPokemon[0].health}</span>
              </h4>
            </div>

            <div className="statsBackground">
              <h4>
                ⚡ Attack: <span>{myPokemon[0].attack}</span>
              </h4>
            </div>
            <div className="statsBackground">
              <h4>
                🛡️ Defense: <span>{myPokemon[0].defense}</span>
              </h4>
            </div>
          </div>
          <div className="statsTwo">
            <div className="statsBackground">
              <h5>
                📏 Height: <span>{myPokemon[0].height}</span>
              </h5>
            </div>
            <div className="statsBackground">
              <h5>
                ⚖️ Weight: <span>{myPokemon[0].weight}</span>
              </h5>
            </div>
          </div>
          <button className="btn" onClick={(event) => handleBack(event)}>
            Back
          </button>
        </div>
      ) : (
        <div>
          <Loading />
        </div>
      )}
    </div>
  );
};

export default CardDetail;
