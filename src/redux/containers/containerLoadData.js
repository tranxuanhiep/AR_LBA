import LoadData from "../../LoadData";
import getStoreByRadius from "../../api/functionsApi/getStoreByRadius";

import {
  trackingLocation,
  loadPromotionsOpenApp
} from "../actions/allActions/allActionsLoadData";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    latitude: state.reducerLoadData.latitude,
    longitude: state.reducerLoadData.longitude,
    arrayMarker: state.reducerLoadData.arrayMarker
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getLocationUser: (latitude, longitude, arrayMarker) => {
          dispatch(loadPromotionsOpenApp(arrayMarker));
          dispatch(trackingLocation(latitude, longitude));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoadData);