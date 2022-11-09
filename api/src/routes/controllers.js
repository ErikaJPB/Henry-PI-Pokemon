const express = require("express");
const axios = require("axios");
const { Pokemon, Type } = require("../db");


/**
 * It takes the first 60 pokemon from the API and pushes their URLs into an array.
 */
const getFromApi = async () => {
  const urls = [];
  const apiUrl = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=60");

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
  return await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
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
