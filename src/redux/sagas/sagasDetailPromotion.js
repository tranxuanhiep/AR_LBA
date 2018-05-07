import {
  FETCH_COMMENT_PROMOTION,
  FETCH_COMMENT_PROMOTION_FAILED,
  FETCH_COMMENT_PROMOTION_SUCCESS,
  FETCH_DETAIL_PROMOTION,
  FETCH_DETAIL_PROMOTION_FAILED,
  FETCH_DETAIL_PROMOTION_SUCCESS,
  POST_COMMENT_PROMOTION
} from "../actions/actionsType/actionsTypeDetailPromotion";
import { FETCH_FAVORITE } from "../actions/actionsType/actionTypeFavorite";
import { FAVORITE } from "../actions/actionsType/actionsTypePromotion";
import { put, takeEvery, takeLatest } from "redux-saga/effects";
import { ApiFavorite } from "../../api/functionsApi/postFavorite";
import { ApiDetailPromotion } from "../../api/functionsApi/getPromotionDetail";
import { ApiCommentPromotion } from "../../api/functionsApi/getComments";

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
function* CommnetsPromotion(action) {
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
function* DetailPromotion(action) {
  try {
    const informationPromotion = yield ApiDetailPromotion.PromotionDetail(
      action.idPromotion,
      action.userName
    );

    yield put({
      type: FETCH_DETAIL_PROMOTION_SUCCESS,
      informationPromotion
    });
  } catch (error) {
    yield put({
      type: FETCH_DETAIL_PROMOTION_FAILED,
      error
    });
  }
  try {
    const listCommentPromotion = yield ApiCommentPromotion.GetComments(
      action.idPromotion,
      action.pageNumber
    );

    yield put({
      type: FETCH_COMMENT_PROMOTION_SUCCESS,
      listCommentPromotion
    });
  } catch (error) {
    yield put({
      type: FETCH_COMMENT_PROMOTION_FAILED,
      error
    });
  }
}
export function* watchDetailPromotion() {
  yield takeEvery(FETCH_DETAIL_PROMOTION, DetailPromotion);
}
