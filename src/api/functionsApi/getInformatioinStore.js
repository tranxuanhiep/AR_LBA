import { API_GET_INFORMATION_STORE_BY_ID } from "../allLinksApi";
import Axios from "axios";

function dateCompare(time1, time2) {
  var t1 = new Date();
  var parts = time1.split(":");
  t1.setHours(parts[0], parts[1], 0);
  var t2 = new Date();
  parts = time2.split(":");
  t2.setHours(parts[0], parts[1], 0);

  // returns 1 if greater, -1 if less and 0 if the same
  if (t1.getTime() > t2.getTime()) return 1;
  if (t1.getTime() <= t2.getTime()) return -1;
}

function* compareTime(start, end) {
  const Dates = Date.now();
  const time = new Date(Dates);
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const timenow = hours + ":" + minutes;
  if (dateCompare(start, end) == 1) {
    if ((dateCompare(timenow, start) == -1) && (dateCompare(timenow, end) == 1)) return false;
    else return true;
  } else {
    if ((dateCompare(timenow, start) == 1) && (dateCompare(timenow, end) == -1)) return true;
    else return false;
  }
}

function* getInformationStore(idStore, lat, lng) {
  const Data = yield Axios.post(API_GET_INFORMATION_STORE_BY_ID, {
    Store_ID: idStore,
    lat: lat,
    lng: lng
  });
  if (Data.data.message.success) {
    const Store = yield Data.data.data.Store_DetailsViewModel;
    const str = yield Store.Store_ImageList;
    const res = yield str.split(",");
    const open = yield compareTime(Store.Store_OpenTime, Store.Store_CloseTime)
    const informationStore = yield {
      Store: Store,
      imageList: res,
      open: open
    };
    return informationStore;
  } else return [];
}
export const Api = { getInformationStore };
