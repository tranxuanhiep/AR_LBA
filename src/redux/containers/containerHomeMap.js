import HomeMap from "../../screens/homes/HomeMap";
import { connect } from "react-redux";
import {
  fetchInformationStoreAction,
  fetchInRatingStoreAction,
  fetchInPromotionsStoreAction,
  fetchSearchAction
} from "../actions/allActions/allActionsHomeMap";
const mapStateToProps = state => {
  return {
    latitude: state.reducerLoadData.latitude,
    longitude: state.reducerLoadData.longitude,
    arrayAllMarker: state.reducerLoadData.arrayAllMarker,
    proFile: state.reducerMain.proFile,
    dataSearch: state.reducerHomeMap.dataSearch,
    isLoading: state.reducerHomeMap.isLoading
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
    },
    onFetchSearch: search => {
      dispatch(fetchSearchAction(search));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeMap);
