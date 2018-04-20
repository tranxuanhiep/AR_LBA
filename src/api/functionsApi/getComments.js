import { API_GET_COMMENTS } from "../allLinkAPI";
import axios from "axios";

const GetComments = async (promotionID, pageNumber) => {
  return await axios.post(API_GET_COMMENTS, {
    Promotion_ID: promotionID,
    PageNumber: pageNumber
  });
};
export default GetComments;
