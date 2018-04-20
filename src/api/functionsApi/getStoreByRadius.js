import { API_GET_STORE_BY_RADIUS } from "../allLinksApi";
import axios from "axios";

function* getStoreByRadius (radius, lat, lng)  {
  const Data = yield axios.post(
      API_GET_STORE_BY_RADIUS,
      {
        Radian: radius,
        lat: lat,
        lng: lng
      }
    )
    const Stores = yield Data.data.message.success == true ? Data.data.data.StoreDetailsRadianViewModel : [];
    return Stores;
};

export const Api = {
  getStoreByRadius
}
