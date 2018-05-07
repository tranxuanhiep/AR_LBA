import {
  FETCH_COMMENT_PROMOTION,
  FETCH_COMMENT_PROMOTION_FAILED,
  FETCH_COMMENT_PROMOTION_SUCCESS,
  FETCH_DETAIL_PROMOTION,
  FETCH_DETAIL_PROMOTION_FAILED,
  FETCH_DETAIL_PROMOTION_SUCCESS,
  POST_COMMENT_PROMOTION
} from "../actionsType/actionsTypeDetailPromotion";

export const fetchDetailPromotionAction = (ID_Promotion, Username) => {
  return { type: FETCH_DETAIL_PROMOTION, ID_Promotion, Username };
};

export const fetchDetailPromotionSucccessAction = informationPromotion => {
  return { type: FETCH_DETAIL_PROMOTION_SUCCESS, informationPromotion };
};

export const fetchDetailPromotionFailedAction = error => {
  return { type: FETCH_DETAIL_PROMOTION_FAILED, error };
};

export const fetchCommentPromotionAction = (ID_Promotion, PageNumber) => {
  return { type: FETCH_COMMENT_PROMOTION, ID_Promotion, PageNumber };
};

export const fetchCommentPromotionSucccessAction = listCommentPromotion => {
  return { type: FETCH_COMMENT_PROMOTION_SUCCESS, listCommentPromotion };
};

export const fetchCommentPromotionFailedAction = error => {
  return { type: FETCH_COMMENT_PROMOTION_FAILED, error };
};

export const postCommentPromotionAction = (ID_Promotion, Username, Comment) => {
  return { type: POST_COMMENT_PROMOTION, ID_Promotion, Username, Comment };
};
