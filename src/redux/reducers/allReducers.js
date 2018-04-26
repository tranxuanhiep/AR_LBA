import { combineReducers } from "redux";
import reducerLoadData from "./reducerLoadData";
import reducerHomeMap from "./reducerHomeMap";
import reducerMain from "./reducerMain";
const allReducers = combineReducers({
  reducerLoadData,
  reducerHomeMap,
  reducerMain
  //you can add more reducers here, separated by , !
});
export default allReducers;
