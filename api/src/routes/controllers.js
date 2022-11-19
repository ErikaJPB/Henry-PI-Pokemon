const express = require("express");
const axios = require("axios");
const { Pokemon, Type } = require("../db");

/**
 * It takes the first 40 pokemon from the API and pushes their URLs into an array.
 */
const getFromApi = async () => {
  const urls = [];
  const apiUrl = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40");

  apiUrl.data.results.forEach((element) => {
    urls.push(axios.get(element.url).then((response) => response.data));
  });

  /* Getting the data from the api and returning it in an array. */
  const pokemonInfo = Promise.all(urls).then((response) =>
    response.map((pokemon) => {
      const pokemons = {
        id: pokemon.id,
        name: pokemon.name,
        health: pokemon.stats[0].base_stat,
        attack: pokemon.stats[1].base_stat,
        defense: pokemon.stats[2].base_stat,
        speed: pokemon.stats[5].base_stat,
        height: pokemon.height,
        weight: pokemon.weight,
        image: pokemon.sprites.other["official-artwork"]["front_default"],
        type: pokemon.types.map((el) => el.type.name),
      };
      return pokemons;
    })
  );
  return await pokemonInfo;
};

/**
 * It returns all the pokemon from the database, and includes the types of each pokemon.
 * @returns An array of objects.
 */
const getfromDb = async () => {
  //"Eager Loading" is the act of querying data of several models at once (one 'main' model and one or more associated models).
  return await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        // you can specify which attributes you want fetched. This is done with the attributes option applied inside the through option of the include
        attributes: [], //If you don't want anything from the junction table, you can explicitly provide an empty array to the attributes option inside the through option of the include option, and in this case nothing will be fetched and the extra property will not even be created. In this case we pass the [] but is not necessary, because we only have one attribute in the Type, in the case that we have more than one attribute the (attributes:[] ) is necessary because is going to prevent that all the attributes show up. It'll bring only the attributes that we are naming in the include option.
      },
    },
  });
};

/**
 * Get all pokemons from the api and the database, and return them as a single array.
 * @returns An array of objects.
 */
const getAllPokemons = async () => {
  const api = await getFromApi();
  const db = await getfromDb();
  const allPokemons = [...api, ...db];
  return allPokemons;
};

module.exports = {
  getFromApi,
  getfromDb,
  getAllPokemons,
};
