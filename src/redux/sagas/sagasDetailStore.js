import { ADD_RATING } from "../actions/actionsType/actionsTypeDetailStore";
import { FETCH_RATING_STORE } from "../actions/actionsType/actionsTypeHomeMap";
import { put, takeEvery, takeLatest } from "redux-saga/effects";
import { Api } from "../../api/functionsApi/putRating";

function* addNewRating(action) {
  try {
    const check = yield Api.Ratings(
      action.newRating.storeID,
      action.newRating.username,
      action.newRating.comment,
      action.newRating.rating
    );
    if (check === true) {
      yield put({
        type: FETCH_RATING_STORE,
        idStore: action.newRating.storeID,
        Username: action.newRating.username,
        PageNumber: 1
      });
    }
  } catch (error) {}
}
export function* watchAddnewRating() {
  yield takeEvery(ADD_RATING, addNewRating);
}
