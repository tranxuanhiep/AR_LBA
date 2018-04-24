import {
  FETCH_INFORMATION_STORE,
  FETCH_INFORMATION_STORE_FAILED,
  FETCH_INFORMATION_STORE_SUCCESS,
  FETCH_RATING_STORE,FETCH_RATING_STORE_SUCCESS,FETCH_RATING_STORE_FAILED
} from "../actions/actionsType/actionsTypeHomeMap";
import { put, takeEvery, takeLatest } from "redux-saga/effects";
import { Api } from "../../api/functionsApi/getInformatioinStore";

import { ApiRating } from "../../api/functionsApi/getRatingByStore";

function* fetchInformationStore(action) {
  try {
    const informationStore = yield Api.getInformationStore(
      action.idStore,
      action.latitude,
      action.longitude
    );
    yield put({ type: FETCH_INFORMATION_STORE_SUCCESS, informationStore });
  } catch (error) {
    yield put({ type: FETCH_INFORMATION_STORE_FAILED, error });
  }
}
export function* watchFetchInformationStore() {
  yield takeEvery(FETCH_INFORMATION_STORE, fetchInformationStore);
}

function* fetchRatingStore(action) {
  try {
    const listRatingStore = yield ApiRating.getRatings(
      action.idStore,
      action.Username,
      action.PageNumber
    );
    yield put({ type: FETCH_RATING_STORE_SUCCESS, listRatingStore });
  } catch (error) {
    yield put({ type: FETCH_RATING_STORE_FAILED, error });
  }
}
export function* watchFetchRatingStore() {
  yield takeEvery(FETCH_RATING_STORE, fetchRatingStore);
}
