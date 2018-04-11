import {API_SIGN_IN} from "../allLinksApi"
const signIn = (userName, password) =>
  fetch(API_SIGN_IN, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      UserName: userName,
      Password: password
    })
  })
    .then(response => response.json())
    .catch(error => {
      console.log(error);
    });
export default signIn;