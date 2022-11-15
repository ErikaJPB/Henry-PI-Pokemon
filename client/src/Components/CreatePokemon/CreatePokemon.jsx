import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { getTypes, createPokemon } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const CreatePokemon = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const types = useSelector((state) => state.types);

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

  function handleChange(event) {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  }

  function handleSelect(event) {
    setInput({
      ...input,
      type: [...input.type, event.target.value],
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(input);
    dispatch(createPokemon(input));
    alert("Your Pokemon was created succesfully");
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
  }
  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  return (
    <div>
      <Link to="/home">
        <button>Back</button>
      </Link>
      <h3>Create your Pokemon!</h3>

      <form onSubmit={(event) => handleSubmit(event)}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={input.name}
            placeholder="Insert name..."
            onChange={(event) => handleChange(event)}
          ></input>
        </div>

        <div>
          <label>Health: </label>
          <input
            type="number"
            name="health"
            value={input.health}
            placeholder="Insert health..."
            onChange={(event) => handleChange(event)}
          ></input>
        </div>

        <div>
          <label>Attack: </label>
          <input
            type="number"
            name="attack"
            value={input.attack}
            placeholder="Insert attack..."
            onChange={(event) => handleChange(event)}
          ></input>
        </div>

        <div>
          <label>Defense: </label>
          <input
            type="number"
            name="defense"
            value={input.defense}
            placeholder="Insert defense..."
            onChange={(event) => handleChange(event)}
          ></input>
        </div>

        <div>
          <label>Speed: </label>
          <input
            type="number"
            name="speed"
            value={input.speed}
            placeholder="Insert speed..."
            onChange={(event) => handleChange(event)}
          ></input>
        </div>

        <div>
          <label>Height: </label>
          <input
            type="number"
            name="height"
            value={input.height}
            placeholder="Insert height..."
            onChange={(event) => handleChange(event)}
          ></input>
        </div>

        <div>
          <label>Weight: </label>
          <input
            type="number"
            name="weight"
            value={input.weight}
            placeholder="Insert weight..."
            onChange={(event) => handleChange(event)}
          ></input>
        </div>

        <div>
          <label>Image: </label>
          <input
            type="text"
            name="image"
            value={input.image}
            placeholder="Insert image URL..."
            onChange={(event) => handleChange(event)}
          ></input>
        </div>

        <select onChange={(event) => handleSelect(event)}>
          {types.map((type) => (
            <option value={type.name} key={type.id} name={type.name}>
              {type.name[0].toUpperCase() + type.name.substring(1)}
            </option>
          ))}
        </select>
        <ul>
          <li>{input.type.map((type) => type + " ")}</li>
        </ul>

        <button type="submit"> Create your Pokemon </button>
      </form>
    </div>
  );
};

export default CreatePokemon;
