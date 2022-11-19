const initialState = {
  pokemons: [],
  allPokemons: [],
  types: [],
  detail: [],
};
/**
 * It takes the current state and an action as arguments, and it returns the next state.
 * @param [state] - The current state of the store.
 * @param action - {
 * @returns The state is being returned.
 */

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    /* Getting the pokemons from the API and storing them in the state. */
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
      };

    /* Getting the types from the API and storing them in the state. */
    case "GET_TYPES":
      return { ...state, types: action.payload };

   /* Filtering the pokemons by name. */
    case "SEARCH_BY_NAME":
      return {
        ...state,
        allPokemons: action.payload,
      };

    /* Getting the detail of the pokemon. */
    case "GET_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };
/* Clearing the detail of the pokemon. */

    case "CLEAR_DETAIL":
      return {
        ...state,
        detail: [],
      };

    
    case "CREATE_POKEMON":
      return { ...state };

    /* Filtering the pokemons by type. */
    case "FILTER_BY_TYPE":
      const allPokemons = state.allPokemons;
      const dataApi = allPokemons.filter(
        (pokemon) => pokemon.type && pokemon.type.includes(action.payload)
      );
      const dataDb = allPokemons.filter(
        (pokemon) =>
          pokemon.Types &&
          pokemon.Types.map((type) => type.name).includes(action.payload)
      );
      const ApiDb = [...dataApi, ...dataDb];

      return {
        ...state,
        allPokemons: ApiDb,
      };
/* Filtering the pokemons by API or DB. */

    case "FILTER_BY_API_DB":
      if (action.payload === "Api") {
        state.allPokemons = state.pokemons.filter(
          (pokemon) => !pokemon.createdInDb
        );
      }

      if (action.payload === "Db") {
        state.allPokemons = state.pokemons.filter(
          (pokemon) => pokemon.createdInDb
        );
      }
      if (action.payload === "All") {
        state.allPokemons = state.pokemons;
      }

      return {
        ...state,
        allPokemons: state.allPokemons,
      };

    /* Sorting the pokemons by name. */
    case "FILTER_BY_ORDER":
      const sortedArray =
        action.payload === "asc"
          ? state.pokemons.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              }

              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return -1;
              }

              return 0;
            })
          : state.pokemons.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1;
              }

              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return 1;
              }

              return 0;
            });

      return {
        ...state,
        pokemons: sortedArray,
      };

    /* Sorting the pokemons by attack. */
    case "FILTER_BY_ATTACK":
      const sortedAttack =
        action.payload === "max"
          ? state.pokemons.sort((a, b) => {
              if (a.attack < b.attack) {
                return 1;
              }
              if (b.attack < a.attack) {
                return -1;
              }
              return 0;
            })
          : state.pokemons.sort((a, b) => {
              if (a.attack < b.attack) {
                return -1;
              }
              if (b.attack < a.attack) {
                return 1;
              }

              return 0;
            });

      return {
        ...state,
        pokemons: sortedAttack,
      };

    default:
      return { ...state };
  }
};
export default rootReducer;
