import HomeList from "../../screens/homes/HomeList";
import {
  fetchPromotionsAction,
  fetchTopPromotionsAction
} from "../actions/allActions/allActionsPromotion";
import {
  fetchDetailPromotionAction
} from "../actions/allActions/allActionDetailPromotion";
import {
  fetchInformationStoreAction,fetchInPromotionsStoreAction
} from "../actions/allActions/allActionsHomeMap";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    latitude: state.reducerLoadData.latitude,
    longitude: state.reducerLoadData.longitude,
    arrayPromotions: state.reducerPromotions.arrayPromotions,
    arrayTopPromotions: state.reducerPromotions.arrayTopPromotions,
    proFile: state.reducerMain.proFile,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFetchPromotions: (latitude, longitude) => {
      dispatch(fetchPromotionsAction(latitude, longitude));
    },
    onFetchTopPromotions: (radius,latitude,longitude) => {
      dispatch(fetchTopPromotionsAction(radius,latitude, longitude));
    },
    onFetchDetailPromotion: (promotionID, Username) => {
      dispatch(fetchDetailPromotionAction(promotionID, Username));
    },
    onFetchInformationStore: (idStore, latitude, longitude) => {
      dispatch(fetchInformationStoreAction(idStore, latitude, longitude));
    },
    onFetchPromotionsStore: (idStore, Username) => {
      dispatch(fetchInPromotionsStoreAction(idStore, Username));
    },
    onFetchRatingStore: (idStore, Username, PageNumber) => {
      dispatch(fetchInRatingStoreAction(idStore, Username, PageNumber));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeList);
