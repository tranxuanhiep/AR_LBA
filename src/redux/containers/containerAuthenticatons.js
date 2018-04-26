import Authentications from "../../screens/authentications/Authentications";
import { connect } from "react-redux";
import { onSignin,onSignout } from "../actions/allActions/allActionsMain";
const mapStateToProps = state => {
  return { proFile: state.reducerMain.proFile, types: state.reducerMain.types };
};
const mapDispatchToProps = dispatch => {
  return {
    onSigninFBorGG: () => {
      dispatch(onSignin());
    },
    onSignoutFBorGG: () => {
      dispatch(onSignout());
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Authentications);
