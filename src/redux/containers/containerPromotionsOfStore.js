import PromotionsOfStore from "../../screens/storeDetail/PromotionsOfStore";
import { connect } from "react-redux";
import { onFavorite } from "../actions/allActions/allActionsPromotion";
const mapStateToProps = state => {
  return {
    promotionsofStore: state.reducerHomeMap.promotionsofStore,
    proFile: state.reducerMain.proFile
  };
};
const mapDispatchToProps = dispatch => {
  return {
    favorite: (idPromotion, userName, idStore) => {
      dispatch(onFavorite(idPromotion, userName, idStore));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PromotionsOfStore);
