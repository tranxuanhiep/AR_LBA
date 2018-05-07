import { API_TOP_PROMOTIONS } from "../allLinksApi";
import Axios from "axios";
function* getTopPromotions(radius, Lat, Lng) {
    const Data = yield Axios.post(
        API_TOP_PROMOTIONS,
        {
            Radian:radius,
            lat: Lat,
            lng: Lng
        })
    const TopPromotions = yield Data.data.message.success == true ? Data.data.data: [];
    return TopPromotions;
}
export const ApiTopPromotions = {
    getTopPromotions
}
