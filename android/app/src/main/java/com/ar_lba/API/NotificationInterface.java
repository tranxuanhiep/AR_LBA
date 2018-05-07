package com.ar_lba.API;

import com.ar_lba.model.JsonNotification.Notification;
import com.ar_lba.model.JsonNotification.RequestNotification;


import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

/**
 * Created by hanson on 05/05/2018.
 */

public interface NotificationInterface {
    @POST("/api/Noti")
    Call<Notification> getData(@Body RequestNotification requestNotification);
}
