import {
  FETCH_STORES_FAILED,
  FETCH_STORES_SUCCESS,
  GET_LOCATION_USER
} from "../actions/actionsType/actionsTypeLoadData";
const stateDefault = {
  longitude: 0,
  latitude: 0,
  arrayMarker: []
};
const reducerLoadData = (state = stateDefault, action) => {
  switch (action.type) {
    case FETCH_STORES_SUCCESS: {
      return { ...state, arrayMarker: action.arrayMarker };
    }
    case FETCH_STORES_FAILED:
      return { ...state, arrayMarker: [] };
    case GET_LOCATION_USER:
      return {
        ...state,
        latitude: action.latitude,
        longitude: action.longitude
      };
    default:
      return state; //state does not change
  }
};
export default reducerLoadData;
