const initialState = {
  pokemons: [],
  allPokemons: [],
  types: [],
  detail: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
      };

    case "GET_TYPES":
      return { ...state, types: action.payload };

    case "SEARCH_BY_NAME":
      return {
        ...state,
        allPokemons: action.payload,
      };

    case "GET_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };

    case "CLEAR_DETAIL":
      return {
        ...state,
        detail: [],
      };

    case "CREATE_POKEMON":
      return { ...state };

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
