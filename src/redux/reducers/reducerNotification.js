import {
    FETCH_NOTIFICATION_SUCCESS,
    FETCH_NOTIFICATION_FAILED,
    FETCH_NOTIFICATION
  } from "../actions/actionsType/actionTypeNotification";
  const stateDefault = {
    Notification:[],
    isLoadingNotification:false
  };
  const reducerNotification = (state = stateDefault, action) => {
    switch (action.type) {
      case FETCH_NOTIFICATION_SUCCESS: {
        return { ...state, Notification: action.Notification,isLoadingNotification:false };
      }
      case FETCH_NOTIFICATION: {
        return { ...state, isLoadingNotification:true };
      }
      case FETCH_NOTIFICATION_FAILED: {
        return { ...state, Notification: [],isLoadingNotification:false };
      }
      default:
        return state; //state does not change
    }
  };
  export default reducerNotification;
  