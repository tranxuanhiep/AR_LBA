import {
  FETCH_INFORMATION_STORE,
  FETCH_INFORMATION_STORE_SUCCESS,
  FETCH_INFORMATION_STORE_FAILED,
  FETCH_RATING_STORE,
  FETCH_RATING_STORE_FAILED,
  FETCH_RATING_STORE_SUCCESS
} from "../actionsType/actionsTypeHomeMap";

export const fetchInformationStoreAction = (idStore, latitude, longitude) => {
  return { type: FETCH_INFORMATION_STORE, idStore, latitude, longitude };
};

export const fetchInformationStoreSucccessAction = informationStore => {
  return { type: FETCH_INFORMATION_STORE_SUCCESS, informationStore };
};

export const fetchInformationStoreFailedAction = error => {
  return { type: FETCH_INFORMATION_STORE_FAILED, error };
};

export const fetchInRatingStoreAction = (idStore, Username, PageNumber) => {
  return { type: FETCH_RATING_STORE, idStore, Username, PageNumber };
};

export const fetchInRatingStoreSucccessAction = listRatingStore => {
  return { type: FETCH_RATING_STORE_SUCCESS, listRatingStore };
};

export const fetchInRatingStoreFailedAction = error => {
  return { type: FETCH_RATING_STORE_FAILED, error };
};
