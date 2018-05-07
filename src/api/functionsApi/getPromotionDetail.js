import { API_GET_PROMOTION_AND_CHECKFAVORITE } from "../allLinksApi";
import axios from "axios";

function* PromotionDetail(promotionID, username){
  const Data = yield axios.post(API_GET_PROMOTION_AND_CHECKFAVORITE, {
    Promotion_ID: promotionID,
    Username: username
  });
  const informationPromotion = yield Data.data.message.success ?  Data.data.data : null
  return informationPromotion
};
export const ApiDetailPromotion = { PromotionDetail };
 