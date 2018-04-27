import {
FAVORITE
} from "../actionsType/actionsTypePromotion";

export const onFavorite = (idPromotion,userName,idStore) => {
  return { type: FAVORITE, idPromotion, userName, idStore };
};
