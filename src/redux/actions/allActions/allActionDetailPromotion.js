import {
  FETCH_COMMENT_PROMOTION,
  FETCH_COMMENT_PROMOTION_FAILED,
  FETCH_COMMENT_PROMOTION_SUCCESS,
  FETCH_DETAIL_PROMOTION,
  FETCH_DETAIL_PROMOTION_FAILED,
  FETCH_DETAIL_PROMOTION_SUCCESS,
  POST_COMMENT_PROMOTION
} from "../actionsType/actionsTypeDetailPromotion";

export const fetchDetailPromotionAction = (promotionID, Username) => {
  return { type: FETCH_DETAIL_PROMOTION, promotionID, Username };
};

export const fetchDetailPromotionSucccessAction = informationPromotion => {
  return { type: FETCH_DETAIL_PROMOTION_SUCCESS, informationPromotion };
};

export const fetchDetailPromotionFailedAction = error => {
  return { type: FETCH_DETAIL_PROMOTION_FAILED, error };
};

export const fetchCommentPromotionAction = (promotionID, PageNumber) => {
  return { type: FETCH_COMMENT_PROMOTION, promotionID, PageNumber };
};

export const fetchCommentPromotionSucccessAction = listCommentPromotion => {
  return { type: FETCH_COMMENT_PROMOTION_SUCCESS, listCommentPromotion };
};

export const fetchCommentPromotionFailedAction = error => {
  return { type: FETCH_COMMENT_PROMOTION_FAILED, error };
};

export const postCommentPromotionAction = (promotionID, Username, Comment) => {
  return { type: POST_COMMENT_PROMOTION, promotionID, Username, Comment };
};
