import { API_GET_INFORMATION_STORE_BY_ID } from "../allLinkAPI";
import Axios from "axios";
const getInformationStoreById = async (idStore, lat, lng) => {
  return await Axios.post(API_GET_INFORMATION_STORE_BY_ID, {
    Store_ID: idStore,
    lat: lat,
    lng: lng
  });
};
export default getInformationStoreById;
