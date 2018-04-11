import {API_CODE_CONFIRM_SIGN_UP} from "../allLinksApi"
const codeConfirmSignUp = (userName, account_VerificationCode) =>
  fetch(API_CODE_CONFIRM_SIGN_UP, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      Username: userName,
      Account_VerificationCode: account_VerificationCode
    })
  })
    .then(response => response.json())
    .catch(error => {
      console.log(error);
    });
export default codeConfirmSignUp;