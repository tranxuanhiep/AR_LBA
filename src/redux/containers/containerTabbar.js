import TabBar from "../../components/customesTabBar/TabBar";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    arrayMarker: state.reducerLoadData.arrayMarker
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(TabBar);
