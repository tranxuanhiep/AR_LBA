package com.ar_lba.API;



import com.ar_lba.model.JsonStore.Request;
import com.ar_lba.model.JsonStore.Store;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

/**
 * Created by hanson on 26/04/2018.
 */

public interface StoreInterface {
    @POST("/api/GetStoreDetailByID")
    Call<Store> getData(@Body Request request);
}
