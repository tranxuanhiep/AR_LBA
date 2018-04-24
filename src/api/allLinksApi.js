export const API_SIGN_IN =
  "http://lbawebserver.us-east-1.elasticbeanstalk.com/api/Login";
export const API_SIGN_UP =
  "http://lbawebserver.us-east-1.elasticbeanstalk.com/api/CustomerRegister";
export const API_CODE_CONFIRM_SIGN_UP =
  "http://lbawebserver.us-east-1.elasticbeanstalk.com/api/VerifyAccountRegister";
export const API_FORGOT_PASSWORD =
  "http://lbawebserver.us-east-1.elasticbeanstalk.com/api/ForgotPassword";
export const API_CODE_CONFIRM_FORGOT_PASSWORD =
  "http://lbawebserver.us-east-1.elasticbeanstalk.com/api/VerifyForgotPassword";
export const API_CHANGE_PASSWORD =
  "http://lbawebserver.us-east-1.elasticbeanstalk.com/api/AccountChangePassword";
export const API_GET_STORE_BY_RADIUS =
  "http://lbawebserver.us-east-1.elasticbeanstalk.com/api/GetStoreDetailsByRadian";
export const API_GET_ORDINARY_PROMOTIONS =
  "http://lbawebserver.us-east-1.elasticbeanstalk.com/api/GetPromotions";
export const CHECK_TOKEN =
  "http://lbawebserver.us-east-1.elasticbeanstalk.com/api/Token";
export const GET_PROFILE_SIGNIN_WITH_FACEBOOK =
  "https://graph.facebook.com/v2.5/me?fields=id,name,birthday,gender,email,first_name,last_name,picture{url}&access_token=";
export const GET_PROFILE_SIGNIN_WITH_GOOGLE =
  "https://www.googleapis.com/plus/v1/people/107648527285522717037?fields=birthday%2Cgender&key=AIzaSyB9lTSgPuDkJ51GNNvxv2sMZk9QUgmGxGo";
export const API_GET_INFORMATION_STORE_BY_ID =
  "http://lbawebserver.us-east-1.elasticbeanstalk.com/api/GetStoreDetailByID";
export const API_GET_RATING =
  "http://lbawebserver.us-east-1.elasticbeanstalk.com/api/GetCommentsOfStore_CheckRatedUser_PagingComments";
export const API_POST_RATING =
  "http://lbawebserver.us-east-1.elasticbeanstalk.com/api/PostRatingStore";
export const API_GET_PROMOTION_BY_ID_STORE =
  "http://lbawebserver.us-east-1.elasticbeanstalk.com/api/GetPromotionsByIDStore";
export const API_GET_PROMOTION_AND_CHECKFAVORITE =
  "http://lbawebserver.us-east-1.elasticbeanstalk.com/api/GetPromotionDetail_CheckFavorite";
export const API_GET_COMMENTS =
  "http://lbawebserver.us-east-1.elasticbeanstalk.com/api/GetComentsByIDPromotionPaging";
export const API_POST_COMMENT =
  "http://lbawebserver.us-east-1.elasticbeanstalk.com/api/PostCommentPromotion";
export const API_FAVORITE =
  "http://lbawebserver.us-east-1.elasticbeanstalk.com/api/PostFavoritePromotion";
export const API_UNFAVORITE =
  "http://lbawebserver.us-east-1.elasticbeanstalk.com/api/UnFavoritePromotion";
  export const API_GETPICTURE_USER_FACEBOOK = "https://graph.facebook.com/v2.5/me?fields=picture{url}";
