import {
  GET_PROFILE_USER,
  SIGNIN
} from "../actions/actionsType/actionsTypeMain";
import { put, takeEvery, takeLatest } from "redux-saga/effects";
import { Apifb } from "../../api/functionsApi/getProfileSigninWithFacebook";
import { ApiGG } from "../../api/functionsApi/getProfileSigninWithGoogle";
import { ApiSignin } from "../../api/functionsApi/SignUp";
import { GoogleSignin, GoogleSigninButton } from "react-native-google-signin";
const FBSDK = require("react-native-fbsdk");
const { LoginButton, AccessToken, LoginManager } = FBSDK;
function* fetchProFileUser(action) {
  try {
    const data = yield AccessToken.getCurrentAccessToken();
    if (data != null) {
      const proFile = yield Apifb.getProfileSigninWithFacebook(
        data.accessToken
      );
      yield put({ type: GET_PROFILE_USER, proFile: proFile, types: 2 });
      const gender = yield proFile.gender == "male" ? 1 : 0;
      yield ApiSignin.signUp(
        proFile.id,
        "facebook",
        proFile.first_name,
        proFile.last_name,
        proFile.birthday,
        gender
      );
    }
  } catch (err) {
    console.log("Play services error", err.code, err.message);
  }
  try {
    yield GoogleSignin.hasPlayServices({
      autoResolve: true
    });
    yield GoogleSignin.configure({
      webClientId:
        "121505823634-ecmbqk8qhgvoe60ctvvd7jofkt469i53.apps.googleusercontent.com",
      offlineAccess: false
    });
    const user = yield GoogleSignin.currentUserAsync();
    const Data = yield ApiGG.getProfileSigninWithGoogle(user.accessToken);
    const gender = yield Data.data.gender == "male" ? 1 : 0;
    yield ApiSignin.signUp(
        user.id,
        "google",
        user.familyName,
        user.givenName,
        Data.data.birthday,
        gender
      );
    yield put({
      type: GET_PROFILE_USER,
      proFile: {
        id: user.id,
        name: user.name,
        birthday: Data.data.birthday,
        gender: Data.data.gender,
        email: user.email,
        first_name: user.familyName,
        last_name: user.givenName,
        picture: {
          data: { url: user.photo }
        }
      },
      types: 1
    });
  } catch (err) {
    console.log("Play services error", err.code, err.message);
  }
}
export function* watchFetchProFileUser() {
  yield takeEvery(SIGNIN, fetchProFileUser);
}
