import PromotionsOfStore from "../../screens/storeDetail/PromotionsOfStore";
import { connect } from "react-redux";
import { onFavorite } from "../actions/allActions/allActionsPromotion";
import {
  fetchCommentPromotionAction,
  fetchDetailPromotionAction
} from "../actions/allActions/allActionDetailPromotion";
const mapStateToProps = state => {
  return {
    promotionsofStore: state.reducerHomeMap.promotionsofStore,
    proFile: state.reducerMain.proFile,
    isLoadingListPromotions: state.reducerHomeMap.isLoadingListPromotions
  };
};
const mapDispatchToProps = dispatch => {
  return {
    favorite: (idPromotion, userName, idStore) => {
      dispatch(onFavorite(idPromotion, userName, idStore));
    },
    onFetchDetailPromotion: (promotionID, Username) => {
      dispatch(fetchDetailPromotionAction(promotionID, Username));
    },
    onFetchCommentPromotion: (promotionID, Pagenumber) => {
      dispatch(fetchCommentPromotionAction(promotionID, Pagenumber));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PromotionsOfStore);
