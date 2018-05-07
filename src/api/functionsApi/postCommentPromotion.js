import { API_POST_COMMENT } from "../allLinksApi";
import axios from "axios";

function* Comment(Promotion_ID, Username,text) {
  const Data = yield axios.post(API_POST_COMMENT, {
    Promotion_ID: Promotion_ID,
    Username: Username,
    Comment_Content:text
  });
  const success = yield Data.data.message.success;

  return success;
}
export const ApiComment = { Comment };
