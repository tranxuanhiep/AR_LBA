import {
  FETCH_FAVORITE,
  FETCH_FAVORITE_FAILED,
  FETCH_FAVORITE_SUCCESS
} from "../actions/actionsType/actionTypeFavorite";
import { put, takeEvery, takeLatest } from "redux-saga/effects";
import { ApiFavorite } from "../../api/functionsApi/getFavoriteByUser";

function* fetchFavoriteByUser(action) {
  try {
    const favoriteByUser = yield ApiFavorite.FavoriteByUser(action.Username);
    yield put({ type: FETCH_FAVORITE_SUCCESS, favoriteByUser });
  } catch (error) { 
    yield put({ type: FETCH_FAVORITE_FAILED, error });
  }
}
export function* watchFetchFavoriteByUser() {
  yield takeEvery(FETCH_FAVORITE, fetchFavoriteByUser);
}
