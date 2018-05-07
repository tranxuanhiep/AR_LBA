import PromotionDetail from "../../screens/storeDetail/PromotionDetail";
import { connect } from "react-redux";
import { postCommentPromotionAction } from "../actions/allActions/allActionDetailPromotion";
const mapStateToProps = state => {
  return {
    informationPromotion: state.reducerDetailPromotion.informationPromotion,
    listCommentPromotion: state.reducerDetailPromotion.listCommentPromotion,
    proFile: state.reducerMain.proFile
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onpostCommentPromotion: (idPromotion, Username, Comment) => {
      dispatch(postCommentPromotionAction(idPromotion, Username, Comment));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PromotionDetail);
