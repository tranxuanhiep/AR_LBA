import { FETCH_PROMOTIONS_STORE } from "../actions/actionsType/actionsTypeHomeMap";
import { FETCH_FAVORITE } from "../actions/actionsType/actionTypeFavorite";
import { FAVORITE } from "../actions/actionsType/actionsTypePromotion";
import { put, takeEvery, takeLatest } from "redux-saga/effects";
import { ApiFavorite } from "../../api/functionsApi/postFavorite";

function* Favorite(action) {
  try {
    const check = yield ApiFavorite.Favorite(
      action.idPromotion,
      action.userName
    );
    if (check === true) {
      yield put({
        type: FETCH_PROMOTIONS_STORE,
        idStore: action.idStore,
        Username: action.userName
      });
       yield put({
        type: FETCH_FAVORITE,
        Username: action.userName
      });
    }
  } catch (error) {}
}
export function* watchFavorite() {
  yield takeEvery(FAVORITE, Favorite);
}
