import { API_SEARCH } from "../allLinksApi";
import axios from "axios";

function* getDataSearch(search) {
  const Data = yield axios.post(API_SEARCH, {
    search: search
  });
  const dataSearch = yield Data.data.message.success == true
    ? Data.data.data
    : [];
  return dataSearch;
}

export const ApiSearch = { getDataSearch };
