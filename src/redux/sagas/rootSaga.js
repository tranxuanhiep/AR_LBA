import { delay } from "redux-saga";
import { all, fork } from "redux-saga/effects";

import { watchFetchStores } from "./sagasLoadData";
import { watchFetchInformationStore } from "./sagasHomeMap";
import {
  watchFetchRatingStore,
  watchFetchPromotionsofStore
} from "./sagasHomeMap";
import { watchAddnewRating } from "./sagasDetailStore";
import { watchFetchProFileUser } from "./sagasMain";
import { watchFavorite } from "./sagasPromotionofStore";
import { watchFetchFavoriteByUser } from "./sagasFavorite";
import { watchFetchPromotions } from "./sagasAllPromotions"
import { watchFetchTopPromotions } from "./sagasTopPromotions"
export default function* rootSaga() {
  yield all([
    fork(watchFetchStores),
    fork(watchFetchInformationStore),
    fork(watchFetchRatingStore),
    fork(watchAddnewRating),
    fork(watchFetchPromotionsofStore),
    fork(watchFetchProFileUser),
    fork(watchFavorite),
    fork(watchFetchFavoriteByUser),
    fork(watchFetchPromotions),
    fork(watchFetchTopPromotions)
  ]);
}
