import {
  FETCH_FAVORITE,
  FETCH_FAVORITE_FAILED,
  FETCH_FAVORITE_SUCCESS
} from "../actionsType/actionTypeFavorite";

export const fetchFavoriteByUserAction = Username => {
  return { type: FETCH_FAVORITE, Username };
};

export const fetchFavoriteByUserSucccessAction = favoriteByUser => {
  return { type: FETCH_FAVORITE_SUCCESS, favoriteByUser };
};

export const fetchFavoriteByUserFailedAction = error => {
  return { type: FETCH_FAVORITE_FAILED, error };
};
