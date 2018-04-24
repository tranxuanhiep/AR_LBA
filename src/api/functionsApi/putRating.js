import { API_POST_RATING } from "../allLinksApi";
import axios from "axios";

function* Ratings(storeID, username, comment, rating) {
  const Data = yield axios.post(API_POST_RATING, {
    Store_ID: storeID,
    Username: username,
    Comment: comment,
    Rating_Store: rating
  });
  const Rating = yield Data.data.message.success;

  return Rating;
}
export const Api = { Ratings };
