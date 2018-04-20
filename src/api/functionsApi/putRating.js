import { API_POST_RATING } from "../allLinkAPI";
import axios from "axios";

const Ratings = async (storeID, username, comment, rating) => {
  return await axios.post(API_POST_RATING, {
    Store_ID: storeID,
    Username: username,
    Comment: comment,
    Rating_Store: rating
  });
};
export default Ratings;
