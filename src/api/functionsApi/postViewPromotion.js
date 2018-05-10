import { API_VIEW_PROMOTION } from "../allLinksApi";
import axios from "axios";

const viewPromotion = async (promotionID, username) => {
  return await axios.post(API_VIEW_PROMOTION, {
    Promotion_ID: promotionID,
    Username: username
  });
};
export default viewPromotion;
 