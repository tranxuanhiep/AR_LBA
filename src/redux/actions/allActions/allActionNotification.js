import {
    FETCH_NOTIFICATION,
    FETCH_NOTIFICATION_FAILED,
    FETCH_NOTIFICATION_SUCCESS
  } from "../actionsType/actionTypeNotification";
  
  export const fetchNotificationAction = (username,radius,lat,lng) => {
    return { type: FETCH_NOTIFICATION, username,radius,lat,lng };
  };
  
  export const fetchNotificationSucccessAction = Notification => {
    return { type: FETCH_NOTIFICATION_SUCCESS, Notification };
  };
  
  export const fetchNotificationFailedAction = error => {
    return { type: FETCH_NOTIFICATION_FAILED, error };
  };
  