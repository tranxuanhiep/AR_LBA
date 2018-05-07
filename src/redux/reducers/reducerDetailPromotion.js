import {
  FETCH_COMMENT_PROMOTION,
  FETCH_COMMENT_PROMOTION_FAILED,
  FETCH_COMMENT_PROMOTION_SUCCESS,
  FETCH_DETAIL_PROMOTION,
  FETCH_DETAIL_PROMOTION_FAILED,
  FETCH_DETAIL_PROMOTION_SUCCESS,
  POST_COMMENT_PROMOTION
} from "../actions/actionsType/actionsTypeDetailPromotion";
const stateDefault = {
  informationPromotion: [],
  listCommentPromotion: []
};
const reducerHomeMap = (state = stateDefault, action) => {
  switch (action.type) {
    case FETCH_DETAIL_PROMOTION_SUCCESS: {
      return { ...state, informationPromotion: action.informationPromotion };
    }
    case FETCH_DETAIL_PROMOTION_FAILED:
      return { ...state, informationPromotion: [] };
    case FETCH_COMMENT_PROMOTION_SUCCESS: {
      return { ...state, listCommentPromotion: action.listCommentPromotion };
    }
    case FETCH_COMMENT_PROMOTION_FAILED:
      return { ...state, listCommentPromotion: [] };
    default:
      return state; //state does not change
  }
};
export default reducerHomeMap;
