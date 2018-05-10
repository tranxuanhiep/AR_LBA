import DetailStore from "../../screens/storeDetail/DetailStore";
import { connect } from "react-redux";
import { RatingStore } from "../actions/allActions/allActionsDetailStore";
import { fetchInRatingStoreAction } from "../actions/allActions/allActionsHomeMap";
const mapStateToProps = state => {
  return {
    informationStore: state.reducerHomeMap.informationStore,
    listRatingStore: state.reducerHomeMap.listRatingStore,
    proFile: state.reducerMain.proFile,
    isLoadingStore: state.reducerHomeMap.isLoadingStore,
    isLoadingRating: state.reducerHomeMap.isLoadingRating
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAddRating: newRating => {
      dispatch(RatingStore(newRating));
    },
    onFetchRatingStore: (idStore, Username, PageNumber) => {
      dispatch(fetchInRatingStoreAction(idStore, Username, PageNumber));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailStore);
