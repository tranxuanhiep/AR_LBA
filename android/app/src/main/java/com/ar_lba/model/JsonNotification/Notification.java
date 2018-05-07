package com.ar_lba.model.JsonNotification;


import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;

/**
 * Created by hanson on 05/05/2018.
 */

public class Notification {
    @SerializedName("data")
    @Expose
    private ArrayList<DetailsNotification> data;
    @SerializedName("message")
    @Expose
    private Message message;

    public ArrayList<DetailsNotification> getData() {
        return data;
    }

    public void setData(ArrayList<DetailsNotification> data) {
        this.data = data;
    }

    public Message getMessage() {
        return message;
    }

    public void setMessage(Message message) {
        this.message = message;
    }
}
