import { API_GET_RATING } from "../allLinkAPI";
import axios from "axios";

const getRatings = async (storeID, username, pageNumber) => {
  return await axios.post(API_GET_RATING, {
    Store_ID: storeID,
    Username: username,
    PageNumber: pageNumber
  });
};
export default getRatings;
