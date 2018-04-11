import {API_SIGN_UP} from "../allLinksApi"
const signUp = (
  userName,
  password,
  customer_FirstName,
  customer_LastName,
  customer_DOB,
  customer_Gender
) =>
  fetch(API_SIGN_UP, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authentications: localStorage.getItem("Token")
    },
    body: JSON.stringify({
      Username: userName,
      Password: password,
      Customer_FirstName: customer_FirstName,
      Customer_LastName: customer_LastName,
      Customer_DOB: customer_DOB,
      Customer_Gender: customer_Gender
    })
  })
    .then(response => response.json())
    .catch(error => {
      console.log(error);
    });
export default signUp;