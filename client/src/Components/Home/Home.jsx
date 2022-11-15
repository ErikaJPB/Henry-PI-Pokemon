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
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.allPokemons);
  const allTypes = useSelector((state) => state.types);
  // es lo mismo que usar el mapStateToProps
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12);

  //get current pokemons
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = allPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  const [order, setOrder] = useState("");
  const [ApiorDb, setApiOrDb] = useState("");
  const [type, setType] = useState("");
  const [attack, setAttack] = useState("");

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]);
  //igual al mapDispatchToProps

  function handleReload(event) {
    event.preventDefault();
    dispatch(getPokemons());
  }

  function handleFilterByType(event) {
    event.preventDefault();
    dispatch(filterByType(event.target.value));
    setCurrentPage(1);
    setType(event.target.value);
  }

  function handleFilterByOrigin(event) {
    dispatch(filterByApiDb(event.target.value));
    setCurrentPage(1);
    setApiOrDb(event.target.value);
  }

  function handleFilterByOrder(event) {
    event.preventDefault();
    dispatch(filterByOrder(event.target.value));
    setCurrentPage(1);
    setOrder(event.target.value);
  }

  function handleFilterByAttack(event) {
    event.preventDefault();
    dispatch(filterByAttack(event.target.value));
    setCurrentPage(1);
    setAttack(event.target.value);
  }

  return (
    <div>
      

      <h1> POKÉMON !</h1>

      <Link to="/pokemon">Create a Pokemon</Link>



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
          className="SelectOne"
          onChange={(event) => handleFilterByOrder(event)}
        >
          <option value="default">Filter By Order</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>

        <select
          className="SelectTwo"
          onChange={(event) => handleFilterByOrigin(event)}
        >
          <option value="All"> Filter By Origin</option>
          <option value="Db">DataBase</option>
          <option value="API">API</option>
        </select>

        <select
          className="SelectThree"
          onChange={(event) => handleFilterByAttack(event)}
        >
          <option value="All">Filter By Attack</option>
          <option value="max">Max</option>
          <option value="min">Min</option>
        </select>

        <select
          className="SelectFour"
          onChange={(event) => handleFilterByType(event)}
        >
          <option hidden value="All">
            Filter by types
          </option>

          {allTypes.map((type) => (
            <option value={type.name} key={type.name}>
              {type.name[0].toUpperCase() + type.name.substring(1)}
            </option>
          ))}
        </select>

   


        <div className="pokemonCard">
        {
          currentPokemons && currentPokemons.map(pokemon=> {
            return (
              <div>
              <Link to={"/pokemon/"+ pokemon.id} className="link">
              <div>
              <Card 
              name={pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}
              image={pokemon.image}
              type={pokemon.createdInDb ? pokemon.Types.map(type=> type.name[0].toUpperCase() + type.name.substring(1) + " ")
              : pokemon.type.map(type => type  + " ")}
              
              
              key={pokemon.id} />
              </div>
              </Link>
              </div>
            )
          })}
         
</div>
        <div className="pagination">
          <Pagination
            pokemonsPerPage={pokemonsPerPage}
            totalPokemons={allPokemons.length}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
