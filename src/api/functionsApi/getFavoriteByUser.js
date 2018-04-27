import { API_FAVORITE_BY_USER } from "../allLinksApi";
import axios from "axios";

function* FavoriteByUser(Username) {
  const Data = yield axios.post(API_FAVORITE_BY_USER, {
    Username: Username
  });
  const favoriteByUser = yield Data.data.message.success? Data.data.data:[];

  return favoriteByUser;
}
export const ApiFavorite = { FavoriteByUser };
