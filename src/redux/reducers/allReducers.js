import { combineReducers } from "redux";
import reducerLoadData from "./reducerLoadData";
import reducerHomeMap from "./reducerHomeMap";
import reducerMain from "./reducerMain";
import reducerFavorite from "./reducerFavorite";
import reducerPromotions from "./reducerPromotions"
import reducerDetailPromotion from "./reducerDetailPromotion";
import reducerNotification from "./reducerNotification"
const allReducers = combineReducers({
  reducerLoadData,
  reducerHomeMap,
  reducerMain,
  reducerFavorite,
  reducerDetailPromotion,
  reducerPromotions,
  reducerNotification
  //you can add more reducers here, separated by , !
});
export default allReducers;
