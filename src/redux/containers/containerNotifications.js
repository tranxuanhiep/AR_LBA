import Notifications from "../../screens/notifications/Notifications";
import { connect } from "react-redux";
import { fetchNotificationAction } from "../actions/allActions/allActionNotification";
import { fetchDetailPromotionAction } from "../actions/allActions/allActionDetailPromotion";
import {
  fetchInformationStoreAction,
  fetchInPromotionsStoreAction
} from "../actions/allActions/allActionsHomeMap";

const mapStateToProps = state => {
  return {
    latitude: state.reducerLoadData.latitude,
    longitude: state.reducerLoadData.longitude,
    proFile: state.reducerMain.proFile,
    notification: state.reducerNotification.Notification,
    isLoadingNotification: state.reducerNotification.isLoadingNotification
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFetchNotification: (username, radius, lat, lng) => {
      dispatch(fetchNotificationAction(username, radius, lat, lng));
    },
    onFetchDetailPromotion: (promotionID, Username) => {
      dispatch(fetchDetailPromotionAction(promotionID, Username));
    },
    onFetchInformationStore: (idStore, latitude, longitude) => {
      dispatch(fetchInformationStoreAction(idStore, latitude, longitude));
    },
    onFetchPromotionsStore: (idStore, Username) => {
      dispatch(fetchInPromotionsStoreAction(idStore, Username));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
