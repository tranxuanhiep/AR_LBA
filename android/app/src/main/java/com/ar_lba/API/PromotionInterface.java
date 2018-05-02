package com.ar_lba.API;



import com.ar_lba.model.JsonPromotion.Promotion;
import com.ar_lba.model.JsonPromotion.RequestPromotion;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

/**
 * Created by hanson on 27/04/2018.
 */

public interface PromotionInterface {
    @POST("/api/GetPromotionsByIDStore")
    Call<Promotion> getData(@Body RequestPromotion requestPromotion);
}
