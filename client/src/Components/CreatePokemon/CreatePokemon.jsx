import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { getTypes, createPokemon } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import "./CreatePokemon.css";

const CreatePokemon = () => {
  /* A hook that lets you dispatch actions. */
  const dispatch = useDispatch();
  /* A hook that allows you to access the history object's properties and the closest <Route>'s match
  via the useHistory() hook. */
  const history = useHistory();

  /* Getting the types from the redux store. */
  const types = useSelector((state) => state.types);
  /* Getting the pokemons from the redux store. */
  const pokemons = useSelector((state) => state.pokemons);
  /* Setting the initial state of the errors object to an empty object. */
  const [errors, setErrors] = useState({});
  /* Setting the initial state of the input object to an empty object. */
  const [input, setInput] = useState({
    name: "",
    health: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    image: "",
    type: [],
  });

  /* Setting the state of the input object to the value of the input. */
  function handleChange(event) {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });

    setErrors(
      validation({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  }

  /**
   * It takes the event from the select and adds it to the input.type array.
   */
  function handleSelect(event) {
    if (!input.type.includes(event.target.value)) {
      setInput({
        ...input,
        type: [...input.type, event.target.value],
      });
    }
  }

  /**
   * If there are no errors, create a new Pokemon and redirect to the home page.
   */
  function handleSubmit(event) {
    event.preventDefault();

    if (Object.keys(errors).length === 0) {
      alert("Your Pokemon was created succesfully");
      dispatch(createPokemon(input));

      setInput({
        name: "",
        health: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        image: "",
        type: [],
      });
      history.push("/home");
    } else {
      alert("Fill the information to create your Pokemon");
    }
  }

  /* A hook that is used for performing side effects in function components. It serves the same purpose
  as componentDidMount, componentDidUpdate, and componentWillUnmount in React classes, but unified
  into a single API. */
  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  /**
   * The function takes in an input and returns an error object.
   * @returns an object with the errors.
   */
  function validation(input) {
    let errors = {};

    if (!input.name) {
      errors.name = "You need to provide a name for your Pokemon";
    }

    if (
      pokemons.find(
        (pokemon) => pokemon.name.toLowerCase() === input.name.toLowerCase()
      )
    )
      errors.name = "The Pokemon already exists, you need to choose a new name";

    if (!/^[a-zA-Z ]+$/.test(input.name)) {
      errors.name = "This is an invalid name";
    }
    if (input.health < 1) {
      errors.health = "The miminum health is 1";
    }

    if (input.health > 300) {
      errors.health = "The maximum health is 300";
    }

    if (input.attack < 1) {
      errors.attack = "The minimum attack is 1";
    }
    if (input.attack > 200) {
      errors.attack = "The maximum attack is 200";
    }

    if (input.defense < 1) {
      errors.defense = "The minimum defense is 1";
    }

    if (input.defense > 300) {
      errors.defense = "The maximum defense is 300";
    }

    if (input.speed < 1) {
      errors.speed = "The minimum speed is 1";
    }

    if (input.speed > 250) {
      errors.speed = "The maximum speed is 250";
    }

    if (input.height < 1) {
      errors.height = "The mimimum height is 1";
    }

    if (input.height > 30) {
      errors.height = "The maximum height is 30";
    }

    if (input.weight < 0.1) {
      errors.weight = "The minimum weight is 0.1";
    }

    if (input.weight > 1000) {
      errors.weight = "The maximum weight is 2000";
    }

    return errors;
  }

  /**
   * The function takes an event as an argument and sets the input state to the current input state,
   * but filters out the event from the type array.
   */
  function handleDelete(event) {
    setInput({
      ...input,
      type: input.type.filter((type) => type !== event),
    });
  }

  return (
    <div className="containerform">
      <div className="form">
        <h2>Pokemon Laboratory !</h2>
        <h3> Create your own Pokémon </h3>

        <form onSubmit={(event) => handleSubmit(event)}>
          <div>
            <label>Name: </label>
            <input
              className="placeholder"
              type="text"
              name="name"
              value={input.name}
              placeholder="Insert name..."
              onChange={(event) => handleChange(event)}
            ></input>
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div>
            <label>Health: </label>
            <input
              className="placeholder"
              type="number"
              name="health"
              value={input.health}
              placeholder="Insert health..."
              onChange={(event) => handleChange(event)}
            ></input>
            {errors.health && <p className="error">{errors.health}</p>}
          </div>
          <div>
            <label>Attack: </label>
            <input
              className="placeholder"
              type="number"
              name="attack"
              value={input.attack}
              placeholder="Insert attack..."
              onChange={(event) => handleChange(event)}
            ></input>
            {errors.attack && <p className="error">{errors.attack}</p>}
          </div>
          <div>
            <label>Defense: </label>
            <input
              className="placeholder"
              type="number"
              name="defense"
              value={input.defense}
              placeholder="Insert defense..."
              onChange={(event) => handleChange(event)}
            ></input>
            {errors.defense && <p className="error">{errors.defense}</p>}
          </div>
          <div>
            <label>Speed: </label>
            <input
              className="placeholder"
              type="number"
              name="speed"
              value={input.speed}
              placeholder="Insert speed..."
              onChange={(event) => handleChange(event)}
            ></input>
            {errors.speed && <p className="error">{errors.speed}</p>}
          </div>
          <div>
            <label>Height: </label>
            <input
              className="placeholder"
              type="number"
              name="height"
              value={input.height}
              placeholder="Insert height..."
              onChange={(event) => handleChange(event)}
            ></input>
            {errors.height && <p className="error">{errors.height}</p>}
          </div>
          <div>
            <label>Weight: </label>
            <input
              className="placeholder"
              type="number"
              name="weight"
              value={input.weight}
              placeholder="Insert weight..."
              onChange={(event) => handleChange(event)}
            ></input>
            {errors.weight && <p className="error">{errors.weight}</p>}
          </div>
          <div>
            <label>Image: </label>
            <input
              className="placeholder"
              type="text"
              name="image"
              value={input.image}
              placeholder="Insert image URL..."
              onChange={(event) => handleChange(event)}
            ></input>
          </div>
          <select className="select" onChange={(event) => handleSelect(event)}>
            <option value="" hidden>
              Select Type
            </option>
            {types.map((type) => (
              <option value={type.name} key={type.id} name={type.name}>
                {type.name[0].toUpperCase() + type.name.substring(1)}
              </option>
            ))}
          </select>
          {input.type.map((type) => (
            <div>
              {type}
              <button
                className="btnX"
                type="button"
                onClick={() => handleDelete(type)}
              >
                X
              </button>
            </div>
          ))}
          <Link to="/home">
            <button className="btnBack">Back</button>
          </Link>{" "}
          <button className="btnSubmit" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePokemon;
