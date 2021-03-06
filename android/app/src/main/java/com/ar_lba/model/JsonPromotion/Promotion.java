package com.ar_lba.model.JsonPromotion;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

/**
 * Created by hanson on 27/04/2018.
 */

public class Promotion {
    @SerializedName("data")
    @Expose
    private PromotionProgressing data;
    @SerializedName("message")
    @Expose
    private Message message;

    public PromotionProgressing getData() {
        return data;
    }

    public void setData(PromotionProgressing data) {
        this.data = data;
    }

    public Message getMessage() {
        return message;
    }

    public void setMessage(Message message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "Promotion{" +
                "data=" + data +
                ", message=" + message +
                '}';
    }
}
