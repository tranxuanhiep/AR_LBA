import {
  FETCH_INFORMATION_STORE,
  FETCH_INFORMATION_STORE_FAILED,
  FETCH_INFORMATION_STORE_SUCCESS,
  FETCH_RATING_STORE,
  FETCH_RATING_STORE_FAILED,
  FETCH_RATING_STORE_SUCCESS,
  FETCH_PROMOTIONS_STORE_FAILED,
  FETCH_PROMOTIONS_STORE_SUCCESS,
  FETCH_PROMOTIONS_STORE,
  FETCH_SEARCH_SUCCESS,
  FETCH_SEARCH_FAILED,
  FETCH_SEARCH
} from "../actions/actionsType/actionsTypeHomeMap";
const stateDefault = {
  informationStore: [],
  listRatingStore: [],
  promotionsofStore: [],
  dataSearch: [],
  isLoading: false,
  isLoadingStore: false,
  isLoadingRating: false,
  isLoadingListPromotions:false
};
const reducerHomeMap = (state = stateDefault, action) => {
  switch (action.type) {
    case FETCH_INFORMATION_STORE_SUCCESS: {
      return {
        ...state,
        informationStore: action.informationStore,
        isLoadingStore: false
      };
    }
    case FETCH_INFORMATION_STORE: {
      return { ...state, isLoadingStore: true };
    }
    case FETCH_INFORMATION_STORE_FAILED:
      return { ...state, informationStore: [], isLoadingStore: false };
    case FETCH_RATING_STORE_SUCCESS: {
      return {
        ...state,
        listRatingStore: action.listRatingStore,
        isLoadingRating: false
      };
    }
    case FETCH_RATING_STORE: {
      return { ...state, isLoadingRating: true };
    }
    case FETCH_RATING_STORE_FAILED:
      return { ...state, listRatingStore: [], isLoadingRating: false };
    case FETCH_PROMOTIONS_STORE_SUCCESS: {
      return { ...state, promotionsofStore: action.promotionsofStore };
    }
    case FETCH_PROMOTIONS_STORE:
      return { ...state, isLoadingListPromotions: false };
    case FETCH_PROMOTIONS_STORE_FAILED:
      return { ...state, promotionsofStore: [] };
    case FETCH_SEARCH_SUCCESS: {
      return { ...state, dataSearch: action.dataSearch, isLoading: false };
    }
    case FETCH_SEARCH: {
      return { ...state, isLoading: true };
    }
    case FETCH_SEARCH_FAILED:
      return { ...state, dataSearch: [], isLoading: false };
    default:
      return state; //state does not change
  }
};
export default reducerHomeMap;
