import { GET_PROFILE_SIGNIN_WITH_FACEBOOK } from "../allLinksApi";
import Axios from "axios";

function* getProfileSigninWithFacebook (token) {
  const Data = yield Axios.get(GET_PROFILE_SIGNIN_WITH_FACEBOOK + token);
  return Data.data;
};
export const Apifb={
  getProfileSigninWithFacebook
}
