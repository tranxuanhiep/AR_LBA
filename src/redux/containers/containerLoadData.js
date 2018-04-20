import LoadData from "../../LoadData";

import {
  fetchStoresAction,
  fetchStoresFailedAction,
  fetchStoresSucccessAction
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
    onFetchStores: (latitude, longitude) => {
      dispatch(fetchStoresAction(latitude, longitude));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoadData);
