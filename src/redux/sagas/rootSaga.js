import { delay } from "redux-saga";
import { all, fork,  } from "redux-saga/effects";

import { watchFetchStores } from "./sagasLoadData";

export default function* rootSaga() {
  yield all([
       fork(watchFetchStores)
    ]);
}
