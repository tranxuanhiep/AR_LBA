import {
FAVORITE,
FETCH_PROMOTIONS,
FETCH_PROMOTIONS_SUCCESS,
FETCH_PROMOTIONS_FAILED,
FETCH_TOP_PROMOTIONS,
FETCH_TOP_PROMOTIONS_SUCCESS,
FFETCH_TOP_PROMOTIONS_FAILED
} from "../actionsType/actionsTypePromotion";

export const onFavorite = (idPromotion,userName,idStore) => {
  return { type: FAVORITE, idPromotion, userName, idStore };
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
  return { type: FETCH_TOP_PROMOTIONS,radius, latitude, longitude };
};

export const fetchTopPromotionsSucccessAction = arrayTopPromotions => {
  return { type: FETCH_TOP_PROMOTIONS_SUCCESS, arrayTopPromotions };
};

export const fetchTopPromotionsFailedAction = error => {
  return { type: FFETCH_TOP_PROMOTIONS_FAILED, error };
};