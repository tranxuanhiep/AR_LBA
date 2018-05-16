import Axios from "axios";

function* fetchImageGG(id) {
  const Data = yield Axios.get(
    `https://www.googleapis.com/plus/v1/people/${id}?fields=image&key=AIzaSyB9lTSgPuDkJ51GNNvxv2sMZk9QUgmGxGo`
  );
  const url = yield Data.data.image.url;
  return yield url;
}
export const Api = { fetchImageGG };

