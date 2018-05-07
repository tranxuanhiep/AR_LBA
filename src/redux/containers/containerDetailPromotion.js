import PromotionDetail from "../../screens/storeDetail/PromotionDetail";
import { connect } from "react-redux";
import { postCommentPromotionAction, fetchDetailPromotionAction } from "../actions/allActions/allActionDetailPromotion";
import { onFavorite } from "../actions/allActions/allActionsPromotion";
const mapStateToProps = state => {
  return {
    informationPromotion: state.reducerDetailPromotion.informationPromotion,
    listCommentPromotion: state.reducerDetailPromotion.listCommentPromotion,
    proFile: state.reducerMain.proFile
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onpostCommentPromotion: (promotionID, Username, Comment) => {
      dispatch(postCommentPromotionAction(promotionID, Username, Comment));
    },
    favorite: (idPromotion, userName, idStore) => {
      dispatch(onFavorite(idPromotion, userName, idStore));
       dispatch(fetchDetailPromotionAction(idPromotion, userName));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PromotionDetail);
