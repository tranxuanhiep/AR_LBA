import { SIGNIN,GET_PROFILE_USER,SIGNOUT } from "../actionsType/actionsTypeMain";

export const getProFile = (proFile,types) => {
  return { type: GET_PROFILE_USER, proFile,types };
};
export const onSignin = () => {
  return { type: SIGNIN };
};
export const onSignout = () => {
  return { type: SIGNOUT };
};