import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const SEARCH_BY_NAME = "SEARCH_BY_NAME";
export const GET_TYPES = "GET_TYPES";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const FILTER_BY_API_DB = "FILTER_BY_API_DB";
export const FILTER_BY_ORDER = "FILTER_BY_ORDER";
export const FILTER_BY_ATTACK = "FILTER_BY_ATTACK";
export const GET_DETAIL = "GET_DETAIL";

export const getPokemons = () => {
  return async function (dispatch) {
    return await axios
      .get("http://localhost:3001/pokemons")
      .then((response) => {
        dispatch({
          type: GET_POKEMONS,
          payload: response.data,
        });
      });
  };
};

export const searchName = (name) => {
  return async function (dispatch) {
    return await axios
      .get("http://localhost:3001/pokemons?name=" + name)
      .then((response) => {
        dispatch({
          type: SEARCH_BY_NAME,
          payload: response.data,
        });
      })
      .catch(() => alert(`${name} does not exist`));
  };
};

export const getTypes = () => {
  return async function (dispatch) {
    return await axios.get("http://localhost:3001/types").then((response) => {
      dispatch({
        type: GET_TYPES,
        payload: response.data,
      });
    });
  };
};

export const getDetail = (id) => {
  return async function (dispatch) {
    return await axios
      .get(`http://localhost:3001/pokemons/${id}`)
      .then((response) => {
        dispatch({
          type: GET_DETAIL,
          payload: response.data,
        });
      });
  };
};

export const clearDetail = () => {
  return {
    type: "CLEAR_DETAIL",
  };
};

export const createPokemon = (payload) => {
  return async function (dispatch) {
    const response = await axios.post(
      "http://localhost:3001/pokemons",
      payload
    );
    return response;
  };
};

export const filterByType = (payload) => {
  return {
    type: FILTER_BY_TYPE,
    payload,
  };
};

export const filterByApiDb = (payload) => {
  return {
    type: FILTER_BY_API_DB,
    payload,
  };
};

export const filterByOrder = (payload) => {
  return {
    type: FILTER_BY_ORDER,
    payload,
  };
};

export const filterByAttack = (payload) => {
  return {
    type: FILTER_BY_ATTACK,
    payload,
  };
};
