import {

  FAVORITE,
  FETCH_PROMOTIONS,
  FETCH_PROMOTIONS_SUCCESS,
  FETCH_PROMOTIONS_FAILED,
  FETCH_TOP_PROMOTIONS,
  FETCH_TOP_PROMOTIONS_SUCCESS,
  FFETCH_TOP_PROMOTIONS_FAILED,
  FETCH_COMMENT_PROMOTION,
  FETCH_COMMENT_PROMOTION_FAILED,
  FETCH_COMMENT_PROMOTION_SUCCESS,
  FETCH_DETAIL_PROMOTION,
  FETCH_DETAIL_PROMOTION_FAILED,
  FETCH_DETAIL_PROMOTION_SUCCESS

} from "../actionsType/actionsTypePromotion";

export const onFetchCommentPromotion = (Promotion_ID, pageNumber) => {
  return { type: FETCH_COMMENT_PROMOTION, Promotion_ID, userName, pageNumber };
};

export const onFetchCommentPromotionFailed = (error) => {
  return { type: FETCH_COMMENT_PROMOTION_FAILED, error };
};

export const onFetchCommentPromotionSuccess = (dataPromotion) => {
  return { type: FETCH_COMMENT_PROMOTION_SUCCESS, arrayCommentPromotion };
};

export const onFetchDetailPromotion = (idPromotion, userName, idStore) => {
  return { type: FAVORFETCH_DETAIL_PROMOTIONITE, idPromotion, userName, idStore };
};


export const fetchPromotionsAction = (latitude, longitude) => {
  return { type: FETCH_PROMOTIONS, latitude, longitude };
};

export const fetchPromotionsSucccessAction = arrayPromotions => {
  return { type: FETCH_PROMOTIONS_SUCCESS, arrayPromotions };
};

export const fetchPromotionsFailedAction = error => {
  return { type: FETCH_PROMOTIONS_FAILED, error };
};

export const fetchTopPromotionsAction = (radius, latitude, longitude) => {
  return { type: FETCH_TOP_PROMOTIONS, radius, latitude, longitude };
};

export const fetchTopPromotionsSucccessAction = arrayTopPromotions => {
  return { type: FETCH_TOP_PROMOTIONS_SUCCESS, arrayTopPromotions };
};

export const fetchTopPromotionsFailedAction = error => {
  return { type: FFETCH_TOP_PROMOTIONS_FAILED, error };
};
export const onFetchDetailPromotionFaled = (error) => {
  return { type: FETCH_DETAIL_PROMOTION_FAILED, error };
};

export const onFetchDetailPromotionSuccess = (dataPromotion) => {
  return { type: FETCH_DETAIL_PROMOTION_SUCCESS, dataPromotion };
};

export const onFavorite = (idPromotion, userName, idStore) => {
  return { type: FAVORITE, idPromotion, userName, idStore };
};