import {
  FETCH_FAVORITE,
  FETCH_FAVORITE_FAILED,
  FETCH_FAVORITE_SUCCESS
} from "../actions/actionsType/actionTypeFavorite";
const stateDefault = {
  favoriteByUser: [],
  isLoadingFavorite: false
};
const reducerFavorite = (state = stateDefault, action) => {
  switch (action.type) {
    case FETCH_FAVORITE_SUCCESS: {
      return {
        ...state,
        favoriteByUser: action.favoriteByUser,
        isLoadingFavorite: false
      };
    }
    case FETCH_FAVORITE: {
      return { ...state, isLoadingFavorite: true };
    }
    case FETCH_FAVORITE_FAILED:
      return { ...state, favoriteByUser: [], isLoadingFavorite: false };
    default:
      return state; //state does not change
  }
};
export default reducerFavorite;
