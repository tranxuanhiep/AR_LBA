import Favorites from "../../screens/favorites/Favorites";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    proFile:state.reducerMain.proFile
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
