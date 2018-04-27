import {
  FETCH_FAVORITE,
  FETCH_FAVORITE_FAILED,
  FETCH_FAVORITE_SUCCESS
} from "../actions/actionsType/actionTypeFavorite";
const stateDefault = {
  favoriteByUser: []
};
const reducerFavorite = (state = stateDefault, action) => {
  switch (action.type) {
    case FETCH_FAVORITE_SUCCESS: {
      return { ...state, favoriteByUser: action.favoriteByUser };
    }
    case FETCH_FAVORITE_FAILED:
      return { ...state, favoriteByUser: [] };
    default:
      return state; //state does not change
  }
};
export default reducerFavorite;
