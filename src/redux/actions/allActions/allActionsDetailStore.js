import {
 ADD_RATING
} from "../actionsType/actionsTypeDetailStore";

export const RatingStore = newRating => {
  return { type: ADD_RATING, newRating };
};
