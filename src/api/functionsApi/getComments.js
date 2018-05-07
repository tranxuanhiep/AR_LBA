import { API_GET_COMMENTS } from "../allLinksApi";
import axios from "axios";

function* GetComments(promotionID, pageNumber) {
  const Data = yield axios.post(API_GET_COMMENTS, {
    Promotion_ID: promotionID,
    PageNumber: pageNumber
  });
  const listCommentPromotion = yield Data.data.message.success
    ? Data.data.data
    : [];
  return listCommentPromotion;
}
export const ApiCommentPromotion = { GetComments };
