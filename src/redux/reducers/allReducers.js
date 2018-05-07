import { combineReducers } from "redux";
import reducerLoadData from "./reducerLoadData";
import reducerHomeMap from "./reducerHomeMap";
import reducerMain from "./reducerMain";
import reducerFavorite from "./reducerFavorite";
import reducerDetailPromotion from "./reducerDetailPromotion";
const allReducers = combineReducers({
  reducerLoadData,
  reducerHomeMap,
  reducerMain,
  reducerFavorite,
  reducerDetailPromotion
  //you can add more reducers here, separated by , !
});
export default allReducers;
