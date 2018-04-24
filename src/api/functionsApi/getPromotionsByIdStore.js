import { API_GET_PROMOTION_BY_ID_STORE } from "../allLinksApi";
import axios from "axios";

function* getPromotionsofStore(storeID, username) {
  const Data = yield axios.post(API_GET_PROMOTION_BY_ID_STORE, {
    Store_ID: storeID,
    Username: username
  });
  const promotionsofStore = yield Data.data.message.success == true
    ? Data.data.data
    : [];
  return promotionsofStore;
}

export const ApiPromotions = { getPromotionsofStore };
