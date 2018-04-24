import HomeMap from "../../screens/homes/HomeMap";
import { connect } from "react-redux";
import {
  fetchInformationStoreAction,
  fetchInRatingStoreAction,
  fetchInPromotionsStoreAction
} from "../actions/allActions/allActionsHomeMap";
const mapStateToProps = state => {
  return {
    latitude: state.reducerLoadData.latitude,
    longitude: state.reducerLoadData.longitude,
    arrayMarker: state.reducerLoadData.arrayMarker
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFetchInformationStore: (idStore, latitude, longitude) => {
      dispatch(fetchInformationStoreAction(idStore, latitude, longitude));
    },
    onFetchRatingStore: (idStore, Username, PageNumber) => {
      dispatch(fetchInRatingStoreAction(idStore, Username, PageNumber));
    },
    onFetchPromotionsStore: (idStore, Username) => {
      dispatch(fetchInPromotionsStoreAction(idStore, Username));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeMap);
