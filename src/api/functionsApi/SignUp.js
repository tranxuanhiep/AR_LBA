import { API_SIGN_UP } from "../allLinksApi";
import Axios from "axios";

const signUp = async (
  userName,
  password,
  customer_FirstName,
  customer_LastName,
  customer_DOB,
  customer_Gender
) => {
  return await Axios.post(API_SIGN_UP, {
    Username: userName,
    Password: password,
    Customer_FirstName: customer_FirstName,
    Customer_LastName: customer_LastName,
    Customer_DOB: customer_DOB,
    Customer_Gender: customer_Gender
  });
};
export default signUp;
