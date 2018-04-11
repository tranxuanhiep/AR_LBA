import {
  LOAD_PROMOTIONS_OPEN_APP,
  TRACKING_LOCATION
} from "../actionsType/actionsTypeLoadData";

export const trackingLocation = (latitude, longitude) => {
  return {
    type: TRACKING_LOCATION,
    latitude,
    longitude
  };
};

export const loadPromotionsOpenApp = arrayMarker => {
  return { type: LOAD_PROMOTIONS_OPEN_APP, arrayMarker };
};
