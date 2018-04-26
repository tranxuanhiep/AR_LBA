import { GET_PROFILE_LOGIN_WITH_GOOGLE } from "../allLinksApi";
import Axios from "axios";

function* getProfileSigninWithGoogle(token) {
  const Data = yield Axios.get(
    "https://www.googleapis.com/plus/v1/people/107648527285522717037?fields=birthday%2Cgender&key=AIzaSyB9lTSgPuDkJ51GNNvxv2sMZk9QUgmGxGo",
    null,
    { headers: { Authorization: token } }
  );
  return Data;
};
export const ApiGG={
  getProfileSigninWithGoogle
}
