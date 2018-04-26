import DetailStore from "../../screens/storeDetail/DetailStore";
import { connect } from "react-redux";
import { RatingStore } from "../actions/allActions/allActionsDetailStore";
const mapStateToProps = state => {
  return {
    informationStore: state.reducerHomeMap.informationStore,
    listRatingStore: state.reducerHomeMap.listRatingStore,
    proFile: state.reducerMain.proFile
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAddRating: newRating => {
      dispatch(RatingStore(newRating));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailStore);
