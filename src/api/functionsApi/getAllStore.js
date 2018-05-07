import { API_GET_ALL_STORE } from "../allLinksApi";
import axios from "axios";

function* getAllStoreByRadius(radius, lat, lng) {
  const Data = yield axios.post(API_GET_ALL_STORE, {
    Radian: radius,
    lat: lat,
    lng: lng
  });
  const Stores = yield Data.data.message.success == true
    ? Data.data.data.StoreDetailsRadianViewModel
    : [];
  return Stores;
}

export const ApiStore = { getAllStoreByRadius };
