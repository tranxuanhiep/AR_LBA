import {
  FETCH_STORES,
  FETCH_STORES_SUCCESS,
  FETCH_STORES_FAILED,
  GET_LOCATION_USER,
  FETCH_ALL_STORES,
  FETCH_ALL_STORES_SUCCESS,
  FETCH_ALL_STORES_FAILED
} from "../actionsType/actionsTypeLoadData";

export const fetchStoresAction = (latitude, longitude) => {
  return { type: FETCH_STORES, latitude, longitude };
};

export const fetchStoresSucccessAction = arrayMarker => {
  return { type: FETCH_STORES_SUCCESS, arrayMarker };
};

export const fetchStoresFailedAction = error => {
  return { type: FETCH_STORES_FAILED, error };
};

export const getLocationUser = () => {
  return { type: GET_LOCATION_USER };
};

export const fetchAllStoresAction = (latitude, longitude) => {
  return { type: FETCH_ALL_STORES, latitude, longitude };
};

export const fetchAllStoresSucccessAction = arrayAllMarker => {
  return { type: FETCH_ALL_STORES_SUCCESS, arrayAllMarker };
};

export const fetchAllStoresFailedAction = error => {
  return { type: FETCH_ALL_STORES_FAILED, error };
};
