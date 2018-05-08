import {
    FETCH_NOTIFICATION_SUCCESS,
    FETCH_NOTIFICATION_FAILED
  } from "../actions/actionsType/actionTypeNotification";
  const stateDefault = {
    Notification:[],
  };
  const reducerNotification = (state = stateDefault, action) => {
    switch (action.type) {
      case FETCH_NOTIFICATION_SUCCESS: {
        return { ...state, Notification: action.Notification };
      }
      case FETCH_NOTIFICATION_FAILED: {
        return { ...state, Notification: [] };
      }
      default:
        return state; //state does not change
    }
  };
  export default reducerNotification;
  