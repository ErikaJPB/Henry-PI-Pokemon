import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemons,
  filterByType,
  getTypes,
  filterByApiDb,
  filterByOrder,
  filterByAttack,
} from "../../redux/actions";
import { Link } from "react-router-dom";
import "./Home.css";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination.jsx";
import SearchBar from "../SearchBar/SearchBar";

const Home = (props) => {
  // HOOKS
  //useSelector --> mapStatetoProps --> it takes a function as an argument that returns the part of the state that we want.
  // useDispatch --> mapDispatchToProps --> it'll dispatch all the actions imported from the actions folder.
  //useState --> it adss an internal state to our component so they can be interactive and dynamic.
  //useEffect --> it takes care of the life cycle of our component.

  const dispatch = useDispatch();

  // We bring the pokemons to our local state, the useSelector hook is the equivalent to the map state to props in a class Component

  const allPokemons = useSelector((state) => state.allPokemons);
  const allTypes = useSelector((state) => state.types);

  /* Setting the state of the component. */
  const [currentPage, setCurrentPage] = useState(1); // current page should initialize in page 1
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12); // number of items that we want to display on the screen

  // I want to display 12 item per page, for example in page 3 * 12, my index for the last item should be 36.
  const indexOfLastPokemon = currentPage * pokemonsPerPage;

  // on page 3 the index of the first item should be 36 - 12 = 24
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;

  // we have to calculate the previous constants to know where to make the slice so the pokemons can display correctly
  const currentPokemons = allPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  // Page 1 -->  card 1 to card 12 [0, 11]
  // Page 2 -->  card 13 to card 24 [12, 23]
  // Page 3 --> card 25 to  card 36  [24, 35]
  // Page 4 ---> card 37 to card 40 [36, 39]

  /* Setting the state of the component. */
  // Setting an internal state of the component for every filter or sort we are going to do.
  const [order, setOrder] = useState("");
  const [ApiorDb, setApiOrDb] = useState("");
  const [type, setType] = useState("");
  const [attack, setAttack] = useState("");

  // this function we are going to pass it for every click
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //---------------------------------------

  /* A hook that is similar to the componentDidMount in a class Component. It is going to run the dispatch function to get the pokemons and the types. */
  //Equivalent to map dispatch to props in a class component
  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]);

  function handleReload(event) {
    event.preventDefault();
    dispatch(getPokemons());
  }

  function handleFilterByOrder(event) {
    event.preventDefault();
    dispatch(filterByOrder(event.target.value));
    setCurrentPage(1);
    setOrder(event.target.value);
  }

  function handleFilterByOrigin(event) {
    dispatch(filterByApiDb(event.target.value));
    setCurrentPage(1);
    setApiOrDb(event.target.value);
  }

  function handleFilterByAttack(event) {
    event.preventDefault();
    dispatch(filterByAttack(event.target.value));
    setCurrentPage(1);
    setAttack(event.target.value);
  }

  function handleFilterByType(event) {
    event.preventDefault();
    dispatch(filterByType(event.target.value));
    setCurrentPage(1);
    setType(event.target.value);
  }

  return (
    <div className="background">
      <button className="btnCreate">
        <Link to="/pokemon">Create a Pokemon</Link>
      </button>
      <div className="title">
        <h1 className="poke"> POKÉMON </h1>
        <h2>Gotta Catch 'em All !</h2>
      </div>

      <SearchBar />

      <button
        className="ReloadButton"
        onClick={(event) => {
          handleReload(event);
        }}
      >
        Reload Page
      </button>

      <div>
        <select
          className="selectOne"
          onChange={(event) => handleFilterByOrder(event)}
        >
          <option value="default">Filter By Order</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>

        <select
          className="selectTwo"
          onChange={(event) => handleFilterByOrigin(event)}
        >
          <option value="All"> Filter By Origin</option>
          <option value="Db">DataBase</option>
          <option value="Api">API</option>
        </select>

        <select
          className="selectThree"
          onChange={(event) => handleFilterByAttack(event)}
        >
          <option value="All">Filter By Attack</option>
          <option value="max">Max</option>
          <option value="min">Min</option>
        </select>

        <select
          className="selectFour"
          onChange={(event) => handleFilterByType(event)}
        >
          <option value="All">
            Filter by types
          </option>

          {allTypes.map((type) => (
            <option value={type.name} key={type.id}>
              {type.name[0].toUpperCase() + type.name.substring(1)}
            </option>
          ))}
        </select>

        <div className="pokemonCard">
          {currentPokemons &&
            currentPokemons.map((pokemon) => {
              return (
                <div>
                  <Card
                    name={
                      pokemon.name[0].toUpperCase() + pokemon.name.substring(1)
                    }
                    image={pokemon.image}
                    type={
                      pokemon.createdInDb
                        ? pokemon.Types.map((type) => type.name + " ")
                        : pokemon.type.map((type) => type + " ")
                    }
                    id={pokemon.id}
                    key={pokemon.id}
                  />
                </div>
              );
            })}
        </div>
             
        <div className="pagination">
          { /* A component that is going to display the pagination buttons. */ }
          <Pagination
            pokemonsPerPage={pokemonsPerPage}
            totalPokemons={allPokemons.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
