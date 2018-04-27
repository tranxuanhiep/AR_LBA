import { API_FAVORITE } from "../allLinksApi";
import axios from "axios";

function* Favorite(Promotion_ID,Username) {
  const Data = yield axios.post(API_FAVORITE, {
   Promotion_ID:Promotion_ID,
   Username: Username
  });
  const Favorite = yield Data.data.message.success;

  return Favorite;
}
export const ApiFavorite = { Favorite };
