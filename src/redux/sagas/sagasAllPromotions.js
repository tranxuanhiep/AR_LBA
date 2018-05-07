import {
    FETCH_PROMOTIONS,
    FETCH_PROMOTIONS_SUCCESS,
    FETCH_PROMOTIONS_FAILED
  } from "../actions/actionsType/actionsTypePromotion";
  import { put, takeLatest } from "redux-saga/effects";
  import { ApiPromotions } from "../../api/functionsApi/getAllPromotions";
  
  function* fetchPromotions(action) {
    try {
      const arrayPromotions = yield ApiPromotions.getAllPromotions(
        action.latitude,
        action.longitude
      );
      yield put({ type: FETCH_PROMOTIONS_SUCCESS, arrayPromotions });
    } catch (error) {
      yield put({ type: FETCH_PROMOTIONS_FAILED, error });
    }
  }
  export function* watchFetchPromotions() {
    yield takeLatest(FETCH_PROMOTIONS, fetchPromotions);
  }
  
  