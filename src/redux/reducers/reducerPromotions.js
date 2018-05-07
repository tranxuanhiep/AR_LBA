import {
  FETCH_PROMOTIONS_SUCCESS,
  FETCH_PROMOTIONS_FAILED,
  FETCH_TOP_PROMOTIONS_SUCCESS,
  FETCH_TOP_PROMOTIONS_FAILED
} from "../actions/actionsType/actionsTypePromotion";
const stateDefault = {
  arrayPromotions: [],
  arrayTopPromotions: []
};
const reducerPromotions = (state = stateDefault, action) => {
  switch (action.type) {
    case FETCH_PROMOTIONS_SUCCESS: {
      return { ...state, arrayPromotions: action.arrayPromotions };
    }
    case FETCH_PROMOTIONS_FAILED: {
      return { ...state, arrayPromotions: [] };
    }
    case FETCH_TOP_PROMOTIONS_SUCCESS: {
      return { ...state, arrayTopPromotions: action.arrayTopPromotions };
    }
    case FETCH_TOP_PROMOTIONS_FAILED: {
      return { ...state, arrayTopPromotions: [] };
    }
    default:
      return state; //state does not change
  }
};
export default reducerPromotions;
