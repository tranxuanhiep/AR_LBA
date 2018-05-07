import Main from "../../screens/Main";
import { connect } from "react-redux";
import {NativeModules} from "react-native";
const activityStarter = NativeModules.ActivityStarter;
import { getProFile,onSignin } from "../actions/allActions/allActionsMain";
const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    onSigninFBorGG: () => {
      activityStarter.asynStore(
        JSON.stringify("")
      );
      dispatch(onSignin());
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
