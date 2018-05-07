import HomeList from "../../screens/homes/HomeList";
import {
  fetchPromotionsAction,
  fetchTopPromotionsAction
} from "../actions/allActions/allActionsPromotion";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    latitude: state.reducerLoadData.latitude,
    longitude: state.reducerLoadData.longitude,
    arrayPromotions: state.reducerPromotions.arrayPromotions,
    arrayTopPromotions: state.reducerPromotions.arrayTopPromotions
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFetchPromotions: (latitude, longitude) => {
      dispatch(fetchPromotionsAction(latitude, longitude));
    },
    onFetchTopPromotions: (radius,latitude,longitude) => {
      console.log(radius);
      console.log(latitude)
      console.log(longitude)
      dispatch(fetchTopPromotionsAction(radius,latitude, longitude));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeList);
