import TabBar from "../../components/customesTabBar/TabBar";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    arrayMarker: state.reducerLoadData.arrayMarker
  };
};
export default connect(mapStateToProps)(TabBar);
