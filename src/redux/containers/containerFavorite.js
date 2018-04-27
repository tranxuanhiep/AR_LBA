import Favorites from "../../screens/favorites/Favorites";
import { connect } from "react-redux";
import { fetchFavoriteByUserAction } from "../actions/allActions/allActionFavorite";
import { onFavorite } from "../actions/allActions/allActionsPromotion";
const mapStateToProps = state => {
  return {
    proFile: state.reducerMain.proFile,
    favoriteByUser: state.reducerFavorite.favoriteByUser
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFetchFavoriteByUser: Username => {
      dispatch(fetchFavoriteByUserAction(Username));
    },
    favorite: (idPromotion, userName, idStore) => {
      dispatch(onFavorite(idPromotion, userName, idStore));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
