import { combineReducers } from "redux";
import reducerLoadData from "./reducerLoadData";

const allReducers = combineReducers({
  reducerLoadData
  //you can add more reducers here, separated by , !
});
export default allReducers;
