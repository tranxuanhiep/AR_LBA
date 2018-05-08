import { API_NOTIFICATION } from "../allLinksApi";
import Axios from "axios";
function* getNotification(username,radius,Lat, Lng) {
    const Data = yield Axios.post(
        API_NOTIFICATION,
        {   Username: username,
            Radian:radius,
            lat: Lat,
            lng: Lng
        })
    const Notification = yield Data.data.message.success == true ? Data.data.data: [];
    //alert(JSON.stringify(Data.data.data));
    return Notification;
}
export const ApiNotification = {
    getNotification
}
