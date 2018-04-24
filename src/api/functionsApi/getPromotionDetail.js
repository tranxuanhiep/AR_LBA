import { API_GET_PROMOTION_AND_CHECKFAVORITE } from "../allLinkAPI";
import axios from "axios";

const PromotionDetail = async (promotionID, username) => {
  return await axios.post(API_GET_PROMOTION_AND_CHECKFAVORITE, {
    Promotion_ID: promotionID,
    Username: username
  });
};
export default PromotionDetail;
 