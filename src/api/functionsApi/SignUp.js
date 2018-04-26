import { API_SIGN_UP } from "../allLinksApi";
import Axios from "axios";

function* signUp(
  userName,
  password,
  customer_FirstName,
  customer_LastName,
  customer_DOB,
  customer_Gender
) {
  const Data = yield Axios.post(API_SIGN_UP, {
    Username: userName,
    Password: password,
    Customer_FirstName: customer_FirstName,
    Customer_LastName: customer_LastName,
    Customer_DOB: customer_DOB,
    Customer_Gender: customer_Gender
  });
  return Data.data.message.success;
}
export const ApiSignin = { signUp };
