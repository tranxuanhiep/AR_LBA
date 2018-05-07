import { API_VIEW_STORE } from "../allLinksApi";
import axios from "axios";

const viewStore = async (Store_ID, username) => {
  return await axios.post(API_VIEW_PROMOTION, {
    Store_ID: Store_ID,
    Username: username
  });
};
export default viewStore;
