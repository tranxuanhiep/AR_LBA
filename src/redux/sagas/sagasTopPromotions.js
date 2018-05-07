import {
    FETCH_TOP_PROMOTIONS,
    FETCH_TOP_PROMOTIONS_SUCCESS,
    FETCH_TOP_PROMOTIONS_FAILED
  } from "../actions/actionsType/actionsTypePromotion";
  import { put, takeLatest } from "redux-saga/effects";
  import { ApiTopPromotions } from "../../api/functionsApi/getTopPromotions";
  
  function* fetchTopPromotions(action) {
    try {
      const arrayTopPromotions = yield ApiTopPromotions.getTopPromotions(
        action.radius,
        action.latitude,
        action.longitude
      );
      yield put({ type: FETCH_TOP_PROMOTIONS_SUCCESS, arrayTopPromotions });
    } catch (error) {
      yield put({ type: FETCH_TOP_PROMOTIONS_FAILED, error });
    }
  }
  export function* watchFetchTopPromotions() {
    yield takeLatest(FETCH_TOP_PROMOTIONS, fetchTopPromotions);
  }
  
  