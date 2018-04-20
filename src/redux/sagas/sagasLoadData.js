import {
  FETCH_STORES_FAILED,
  FETCH_STORES_SUCCESS,
  GET_LOCATION_USER,
  FETCH_STORES
} from "../actions/actionsType/actionsTypeLoadData";
import SplashScreen from "react-native-splash-screen";
import { put, takeEvery, takeLatest } from "redux-saga/effects";
import { Api } from "../../api/functionsApi/getStoreByRadius";

function* fetchStores(action) {
  try {
    const arrayMarker = yield Api.getStoreByRadius(
      2.0,
      action.latitude,
      action.longitude
    );
    yield put({ type: FETCH_STORES_SUCCESS, arrayMarker });
    SplashScreen.hide();
    yield put({
      type: GET_LOCATION_USER,
      latitude: action.latitude,
      longitude: action.longitude
    });
  } catch (error) {
    yield put({ type: FETCH_STORES_FAILED, error });
  }
}
export function* watchFetchStores() {
  yield takeEvery(FETCH_STORES, fetchStores);
}
