import { API_GET_PROMOTION_BY_ID_STORE } from "../allLinkAPI";
import axios from "axios";

const GetPromotionByIdStore = async (storeID, username) => {
  return await axios.post(API_GET_PROMOTION_BY_ID_STORE, {
    Store_ID: storeID,
    Username: username
  });
};
export default GetPromotionByIdStore;
