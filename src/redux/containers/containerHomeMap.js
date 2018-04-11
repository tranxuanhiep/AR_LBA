import HomeMap from "../../screens/homes/HomeMap";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    latitude: state.reducerLoadData.latitude,
    longitude: state.reducerLoadData.longitude,
    arrayMarker: state.reducerLoadData.arrayMarker
  };
};
export default connect(mapStateToProps)(HomeMap);
