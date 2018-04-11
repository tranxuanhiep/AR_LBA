import { API_GET_STORE_BY_RADIUS } from "../allLinksApi";
import axios from "axios";

const getStoreByRadius = async (radius, lat, lng) => {
 return await axios.post(
      API_GET_STORE_BY_RADIUS,
      {
        Radian: radius,
        lat: lat,
        lng: lng
      }
    )
};
export default getStoreByRadius;
