import Favorites from "../../screens/favorites/Favorites";
import { connect } from "react-redux";
import { fetchFavoriteByUserAction } from "../actions/allActions/allActionFavorite";
import { onFavorite } from "../actions/allActions/allActionsPromotion";
import {
  fetchCommentPromotionAction,
  fetchDetailPromotionAction
} from "../actions/allActions/allActionDetailPromotion";
const mapStateToProps = state => {
  return {
    proFile: state.reducerMain.proFile,
    favoriteByUser: state.reducerFavorite.favoriteByUser,
    isLoadingFavorite: state.reducerFavorite.isLoadingFavorite
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFetchFavoriteByUser: Username => {
      dispatch(fetchFavoriteByUserAction(Username));
    },
    favorite: (idPromotion, userName, idStore) => {
      dispatch(onFavorite(idPromotion, userName, idStore));
    },
    onFetchDetailPromotion: (promotionID, Username) => {
      dispatch(fetchDetailPromotionAction(promotionID, Username));
    },
    onFetchCommentPromotion: (promotionID, Pagenumber) => {
      dispatch(fetchCommentPromotionAction(promotionID, Pagenumber));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
