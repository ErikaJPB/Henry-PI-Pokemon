import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchName } from "../../redux/actions";
import "./SearchBar.css";

/**
 * I'm trying to get the value of the input field and pass it to the searchName function.
 * @returns The SearchBar component is being returned.
 */
const SearchBar = () => {
  const dispatch = useDispatch();
  /* It's creating a state variable called pokemonName and setting it to an empty string. */
  const [pokemonName, setPokemonName] = useState("");

  /* It's preventing the default behavior of the event. It's setting the state variable pokemonName to
 the value of the input field. It's logging the value of pokemonName to the console. */
  function handleInputChange(event) {
    event.preventDefault();
    setPokemonName(event.target.value);
    console.log(pokemonName);
  }

  /**
   * When the user submits the form, prevent the default action, and dispatch the searchName action with
   * the pokemonName as the argument.
   */
  function handleSubmit(event) {
    event.preventDefault();
    dispatch(searchName(pokemonName));
  }

  return (
    <div>
      <input
        type="text"
        className="placeholder"
        placeholder="Search your Pokémon"
        value={pokemonName}
        onChange={(event) => handleInputChange(event)}
      />

      <button
        className="btn"
        type="submit"
        onClick={(event) => handleSubmit(event)}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
