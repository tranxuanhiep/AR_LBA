import { API_GET_RATING } from "../allLinksApi";
import axios from "axios";

function* getRatings(storeID, username, pageNumber){
  const Data = yield axios.post(API_GET_RATING, {
    Store_ID: storeID,
    Username: username,
    PageNumber: pageNumber
  });
  const listRatingStore = yield Data.data.message.success ? Data.data.data.commentOfStore:[]
  return listRatingStore;
};
export const ApiRating = {
  getRatings
}
