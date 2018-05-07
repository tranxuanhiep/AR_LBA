import { API_GET_ORDINARY_PROMOTIONS } from "../allLinksApi";
import Axios from "axios";
function* getAllPromotions(Lat, Lng) {
    const Data = yield Axios.post(
        API_GET_ORDINARY_PROMOTIONS,
        {
            lat: Lat,
            lng: Lng
        })
    const Promotions = yield Data.data.message.success == true ? Data.data.data.promotionViewModel : [];
    return Promotions;
}
export const ApiPromotions = {
    getAllPromotions
}
