import Main from "../../screens/Main";
import { connect } from "react-redux";
import { getProFile,onSignin } from "../actions/allActions/allActionsMain";
const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    onSigninFBorGG: () => {
      dispatch(onSignin());
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
