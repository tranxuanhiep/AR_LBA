import { delay } from "redux-saga";
import { all, fork } from "redux-saga/effects";

import { watchFetchStores } from "./sagasLoadData";
import { watchFetchInformationStore } from "./sagasHomeMap";
import { watchFetchRatingStore,watchFetchPromotionsofStore } from "./sagasHomeMap";
import { watchAddnewRating } from "./sagasDetailStore";
export default function* rootSaga() {
  yield all([
    fork(watchFetchStores),
    fork(watchFetchInformationStore),
    fork(watchFetchRatingStore),
    fork(watchAddnewRating),
    fork(watchFetchPromotionsofStore)
  ]);
}
