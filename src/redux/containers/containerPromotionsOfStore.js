import PromotionsOfStore from "../../screens/storeDetail/PromotionsOfStore";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { promotionsofStore: state.reducerHomeMap.promotionsofStore };
};
const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(PromotionsOfStore);
