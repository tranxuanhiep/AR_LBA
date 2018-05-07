import {
  FETCH_STORES_FAILED,
  FETCH_STORES_SUCCESS,
  GET_LOCATION_USER,
  FETCH_STORES,
  FETCH_ALL_STORES_SUCCESS,
  FETCH_ALL_STORES_FAILED,
  FETCH_ALL_STORES
} from "../actions/actionsType/actionsTypeLoadData";
import SplashScreen from "react-native-splash-screen";
import { put, takeEvery, takeLatest } from "redux-saga/effects";
import { Api } from "../../api/functionsApi/getStoreByRadius";
import { ApiStore } from "../../api/functionsApi/getAllStore";

function* fetchStores(action) {
  try {
    const arrayMarker = yield Api.getStoreByRadius(
      2.0,
      action.latitude,
      action.longitude
    );
    yield put({ type: FETCH_STORES_SUCCESS, arrayMarker });
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
function* fetchAllStores(action) {
  try {
    const arrayAllMarker = yield ApiStore.getAllStoreByRadius(
      2.0,
      action.latitude,
      action.longitude
    );
    yield put({ type: FETCH_ALL_STORES_SUCCESS, arrayAllMarker });
    SplashScreen.hide();
  } catch (error) {
    yield put({ type: FETCH_ALL_STORES_FAILED, error });
    SplashScreen.hide();
  }
}
export function* watchFetchAllStores() {
  yield takeEvery(FETCH_ALL_STORES, fetchAllStores);
}
