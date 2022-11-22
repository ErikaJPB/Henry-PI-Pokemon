import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const SEARCH_BY_NAME = "SEARCH_BY_NAME";
export const GET_TYPES = "GET_TYPES";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const FILTER_BY_API_DB = "FILTER_BY_API_DB";
export const FILTER_BY_ORDER = "FILTER_BY_ORDER";
export const FILTER_BY_ATTACK = "FILTER_BY_ATTACK";
export const GET_DETAIL = "GET_DETAIL";

/**
 * It's an async function that returns a promise that dispatches an action with a type and a payload.
 * @returns An async function that returns a promise.
 */
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

/**
 * It's an async function that returns a fetch request to the server, then it returns the response as
 * json, then it dispatches the data to the reducer.
 * @returns An object with a function that takes in dispatch as a parameter.
 */
// export const getPokemons = () => {
//   return async function (dispatch) {
//     return await fetch("http://localhost:3001/pokemons")
//       .then((response) => response.json())
//       .then((data) =>
//         dispatch({
//           type: GET_POKEMONS,
//           payload: data,
//         })
//       )
//       .catch(() => alert("Information could not be retrieve at the moment"));
//   };
// };

/**
 * It's an async function that takes in a name, makes a get request to the server, and then dispatches
 * the response to the reducer.
 * @param name - the name of the pokemon you want to search for
 * @returns an async function that takes in dispatch as a parameter.
 */

export const searchName = (name) => {
  return async function (dispatch) {
    return await axios
      .get(`http://localhost:3001/pokemons?name=${name}`)
      .then((response) => {
        dispatch({
          type: SEARCH_BY_NAME,
          payload: response.data,
        });
      })
      .catch(() => alert(`${name} does not exist`));
  };
};
/**
 * It's an async function that returns a function that dispatches an action that returns a promise that
 * dispatches an action.
 * @returns a function.
 */

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



/**
 * It's an async function that returns a function that takes a dispatch function as an argument. 
 * 
 * The function that takes a dispatch function as an argument makes an API call to the server and then
 * dispatches an action to the reducer. 
 * 
 * The reducer then updates the state. 
 * 
 * The state is then passed to the component as props. 
 * 
 * The component then renders the data.
 * @returns An object with a function that takes dispatch as an argument.
 */
// export const getTypes = () => {
//   return async function (dispatch) {
//     const response = await axios.get("http://localhost:3001/types")
//     dispatch({
//       type: GET_TYPES,
//       payload: response.data
//     })
//   }
// }

/**
 * It's an async function that returns a promise that dispatches an action with a payload of the
 * response data from the axios request.
 * @param id - the id of the pokemon you want to get the details of
 * @returns the async function.
 */
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

/**
 * It takes a payload, and returns a function that takes a dispatch, and returns a response.
 * @param payload - {
 * @returns The response from the server.
 */
export const createPokemon = (payload) => {
  return async function (dispatch) {
    const response = await axios.post(
      "http://localhost:3001/pokemons",
      payload
    );
    return response;
  };
};
/**
 * This function takes a payload and returns an object with a type and a payload.
 * @param payload - {
 * @returns An object with a type and a payload.
 */

export const filterByType = (payload) => {
  return {
    type: FILTER_BY_TYPE,
    payload,
  };
};

/**
 * It takes a payload and returns an object with a type and the payload.
 * @param payload - {
 * @returns An object with a type and a payload.
 */
export const filterByApiDb = (payload) => {
  return {
    type: FILTER_BY_API_DB,
    payload,
  };
};

/**
 * It takes a payload and returns an object with a type and a payload.
 * @param payload - {
 * @returns An object with a type and a payload.
 */
export const filterByOrder = (payload) => {
  return {
    type: FILTER_BY_ORDER,
    payload,
  };
};

/**
 * It takes a payload, and returns an object with a type and a payload.
 * @param payload - {
 * @returns An object with a type and a payload.
 */
export const filterByAttack = (payload) => {
  return {
    type: FILTER_BY_ATTACK,
    payload,
  };
};
