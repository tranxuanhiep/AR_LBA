import { CHECK_TOKEN } from "../allLinksApi";
import Axios from "axios";
const getStoreByRadius = async (Token) => {
  return await Axios.post(CHECK_TOKEN,null,{
        headers: {'Authorization': Token}
   })
};
export default getStoreByRadius;
