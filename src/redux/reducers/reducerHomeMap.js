import {
  FETCH_INFORMATION_STORE,
  FETCH_INFORMATION_STORE_FAILED,
  FETCH_INFORMATION_STORE_SUCCESS,
  FETCH_RATING_STORE,
  FETCH_RATING_STORE_FAILED,
  FETCH_RATING_STORE_SUCCESS,
  FETCH_PROMOTIONS_STORE_FAILED,
  FETCH_PROMOTIONS_STORE_SUCCESS,
  FETCH_PROMOTIONS_STORE
} from "../actions/actionsType/actionsTypeHomeMap";
const stateDefault = {
  informationStore: [],
  listRatingStore: [],
  promotionsofStore: []
};
const reducerHomeMap = (state = stateDefault, action) => {
  switch (action.type) {
    case FETCH_INFORMATION_STORE_SUCCESS: {
      return { ...state, informationStore: action.informationStore };
    }
    case FETCH_INFORMATION_STORE_FAILED:
      return { ...state, informationStore: [] };
    case FETCH_RATING_STORE_SUCCESS: {
      return { ...state, listRatingStore: action.listRatingStore };
    }
    case FETCH_RATING_STORE_FAILED:
      return { ...state, listRatingStore: [] };
    case FETCH_PROMOTIONS_STORE_SUCCESS: {
      return { ...state, promotionsofStore: action.promotionsofStore };
    }
    case FETCH_PROMOTIONS_STORE_FAILED:
      return { ...state, promotionsofStore: [] };
    default:
      return state; //state does not change
  }
};
export default reducerHomeMap;
