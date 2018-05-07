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
import { ApiDetailPromotion } from "../../api/functionsApi/getPromotionDetail";
import { ApiCommentPromotion } from "../../api/functionsApi/getComments";
import { ApiComment } from "../../api/functionsApi/postCommentPromotion";
import { FETCH_PROMOTIONS_STORE } from "../actions/actionsType/actionsTypeHomeMap";

function* DetailPromotion(action) {
  try {
    const informationPromotion = yield ApiDetailPromotion.PromotionDetail(
      action.promotionID,
      action.Username
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
      action.promotionID,
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

function* Comment(action) {
  try {
    const informationPromotion = yield ApiComment.Comment(
      action.promotionID,
      action.Username,
      action.Comment
    );
  } catch (error) {
  }
  try {
    const listCommentPromotion = yield ApiCommentPromotion.GetComments(
      action.promotionID,
      1
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
export function* watchComment() {
  yield takeEvery(POST_COMMENT_PROMOTION, Comment);
}
