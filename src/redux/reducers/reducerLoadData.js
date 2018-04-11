import {
  LOAD_PROMOTIONS_OPEN_APP,
  TRACKING_LOCATION
} from "../actions/actionsType/actionsTypeLoadData";
const stateDefault = {
  longitude: 0,
  latitude: 0,
  arrayMarker: []
};
const reducerLoadData = (state = stateDefault, action) => {
  switch (action.type) {
    case TRACKING_LOCATION:
      return {
        ...state,
        latitude: action.latitude,
        longitude: action.longitude
      };
    case LOAD_PROMOTIONS_OPEN_APP:
      return { ...state, arrayMarker: action.arrayMarker };
    default:
      return state; //state does not change
  }
};

export default reducerLoadData;
