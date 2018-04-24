import { combineReducers } from "redux";
import reducerLoadData from "./reducerLoadData";
import reducerHomeMap from "./reducerHomeMap"
const allReducers = combineReducers({
  reducerLoadData,
  reducerHomeMap
  //you can add more reducers here, separated by , !
});
export default allReducers;
