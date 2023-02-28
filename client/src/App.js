import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import Home from "./Components/Home/Home";
import CreatePokemon from "./Components/CreatePokemon/CreatePokemon";
import CardDetail from "./Components/CardDetail/CardDetail";
import React from "react";
import axios from "axios";

//axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.baseURL = "https://pokebackrender.onrender.com";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route path="/pokemon/:id" component={CardDetail} />
          <Route path="/pokemon" component={CreatePokemon} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
