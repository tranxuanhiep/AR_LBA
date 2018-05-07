import { delay } from "redux-saga";
import { all, fork } from "redux-saga/effects";

import { watchFetchStores, watchFetchAllStores } from "./sagasLoadData";
import { watchFetchInformationStore, watchFetchSearch } from "./sagasHomeMap";
import {
  watchFetchRatingStore,
  watchFetchPromotionsofStore
} from "./sagasHomeMap";
import { watchAddnewRating } from "./sagasDetailStore";
import { watchFetchProFileUser } from "./sagasMain";
import { watchFavorite } from "./sagasPromotionofStore";
import { watchFetchFavoriteByUser } from "./sagasFavorite";
import { watchDetailPromotion,watchComment } from "./sagasDetailPromotion";
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
    fork(watchFetchAllStores),
    fork(watchFetchSearch),
    fork(watchDetailPromotion),
    fork(watchComment)
  ]);
}
