import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchName } from "../../redux/actions";
import "./SearchBar.css"

const SearchBar = () => {

  const dispatch = useDispatch();
  const  [pokemonName, setPokemonName]  = useState("");


  function handleInputChange (event) {
    event.preventDefault();
    setPokemonName(event.target.value)
    console.log(pokemonName)
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(searchName(pokemonName))
  }


  return (
    <div>
        <input type="text"
        className="placeholder"
        placeholder="Search..."
        value={pokemonName}
        onChange={(event)=> handleInputChange(event)}
        />

        <button className="btn"
        type="submit"
        onClick={(event)=> handleSubmit(event)}>Search</button>
    </div>
  )
};

export default SearchBar;
