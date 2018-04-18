import { GET_PROFILE_SIGNIN_WITH_FACEBOOK } from "../allLinksApi";
import Axios from "axios";

const getProfileSigninWithFacebook = async (token) => {
  return await Axios.get(GET_PROFILE_SIGNIN_WITH_FACEBOOK + token);
};
export default getProfileSigninWithFacebook;
