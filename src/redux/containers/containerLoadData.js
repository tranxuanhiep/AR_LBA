import LoadData from "../../LoadData";

import {
  fetchStoresAction,
  fetchStoresFailedAction,
  fetchStoresSucccessAction,
  fetchAllStoresAction
} from "../actions/allActions/allActionsLoadData";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFetchStores: (latitude, longitude) => {
      dispatch(fetchStoresAction(latitude, longitude));
    },
    onFetchAllStores: (latitude, longitude) => {
      dispatch(fetchAllStoresAction(latitude, longitude));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoadData);
