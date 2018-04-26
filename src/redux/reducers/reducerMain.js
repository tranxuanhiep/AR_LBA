import {
 GET_PROFILE_USER,SIGNOUT
} from "../actions/actionsType/actionsTypeMain";
const stateDefault = {
  proFile:[],
  types:0
};
const reducerMain = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_PROFILE_USER: {
      return { ...state, proFile: action.proFile, types: action.types };
    }
    case SIGNOUT: {
      return { ...state, proFile: [], types: 0 };
    }
    default:
      return state; //state does not change
  }
};
export default reducerMain;
