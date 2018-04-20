import { API_GET_ORDINARY_PROMOTIONS } from "../allLinksApi";
import Axios from "axios";
const getAllOrdinaryPromotions = async (lat1, lng1) =>{
    return await Axios.post(API_GET_ORDINARY_PROMOTIONS,{
        lat: lat1,
        lng: lng1
    })
}
export default getAllOrdinaryPromotions;
