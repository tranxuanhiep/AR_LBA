import { API_GET_INFORMATION_STORE_BY_ID } from "../allLinksApi";
import Axios from "axios";

function* compareTime(start, end) {
  const Dates = Date.now();
  const time = new Date(Dates);
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const timenow = hours + ":" + minutes;
  if (start > end) {
    if (timenow < start && timenow > end) return false;
    else return true;
  } else {
    if (timenow > start && timenow < end) return true;
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
