const { Router } = require("express");
const axios = require("axios");
const { Pokemon, Type } = require("../db");
const { getFromApi, getfromDb, getAllPokemons } = require("./controllers");
const express = require("express");
const router = Router();

/* Getting all the pokemons from the database and if there is a name in the query it will filter the
pokemons by name. */

router.get("/pokemons", async (request, response) => {
  const { name } = request.query;
  const allPokemons = await getAllPokemons();

  if (name) {
    const namePokemon = allPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(name.toLowerCase())
    );

    if (namePokemon.length !== 0) {
      response.status(200).send(namePokemon);
    } else {
      response.status(404).send("The pokemon does not exist");
    }
  } else {
    response.status(200).send(allPokemons);
  }
});

/* Getting the id from the url and then filtering the pokemons by id. */

router.get("/pokemons/:id", async (request, response) => {
  const { id } = request.params;
  const allPokemons = await getAllPokemons();

  if (id) {
    const pokemonId = allPokemons.filter((pokemon) => pokemon.id == id);
    if (pokemonId.length !== 0) {
      response.status(200).json(pokemonId);
    } else {
      response.status(404).send("The id does not belong to a Pokemon");
    }
  }
});

/* Getting the types from the api and then saving them in the database. */

router.get("/types", async (request, response) => {
  const url = await axios.get("https://pokeapi.co/api/v2/type");

  const types = url.data.results.map((element) => element.name);

  /* Creating the types in the database. */
  types.forEach((type) => {
    Type.findOrCreate({
      // we can't use the create alone because is going to create everytime that we run the server.
      where: {
        name: type,
      },
    });
  });

  /* Getting all the types from the database and then sending them to the client. */
  const allTypes = await Type.findAll();
  response.status(200).send(allTypes);
});

/* This is creating a new pokemon in the database. */

router.post("/pokemons", async (request, response) => {
  const {
    name,
    health,
    attack,
    defense,
    speed,
    height,
    weight,
    image,
    createdInDb,
    type,
  } = request.body;

  try {
    if (!name) throw Error("A name needs to be provided to create the Pokemon");

    const newPokemon = await Pokemon.create({
      name,
      health,
      attack,
      defense,
      speed,
      height,
      weight,
      image,
      createdInDb,
    });

    // the type we are going to find it inside the model that we already created.
    let typeDb = await Type.findAll({
      where: {
        name: type,
      },
    });

    newPokemon.addType(typeDb);

    response.status(200).send("The Pokemon was created successfully");
  } catch (err) {
    response.status(400).send(err.message);
  }
});

/* Deleting the pokemon from the database. */

// router.delete("/pokemons", async (request, response) => {
//   try {
//     const { id } = request.body;

//     const pokemon = await Pokemon.findByPk(id);

//     await pokemon.destroy();
//     response.status(200).send("Pokemon was deleted succesfully");
//   } catch (err) {
//     response.status(400).send("We could not delete the Pokemon");
//   }
// });

module.exports = router;
