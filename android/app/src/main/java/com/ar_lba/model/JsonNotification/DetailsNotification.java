package com.ar_lba.model.JsonNotification;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

/**
 * Created by hanson on 05/05/2018.
 */

public class DetailsNotification {
    @SerializedName("Promotion_ID")
    @Expose
    private int Promotion_ID;
    @SerializedName("Promotion_Title")
    @Expose
    private String Promotion_Title;
    @SerializedName("Promotion_Description")
    @Expose
    private String Promotion_Description;

    public int getPromotion_ID() {
        return Promotion_ID;
    }

    public void setPromotion_ID(int promotion_ID) {
        Promotion_ID = promotion_ID;
    }

    public String getPromotion_Title() {
        return Promotion_Title;
    }

    public void setPromotion_Title(String promotion_Title) {
        Promotion_Title = promotion_Title;
    }

    public String getPromotion_Description() {
        return Promotion_Description;
    }

    public void setPromotion_Description(String promotion_Description) {
        Promotion_Description = promotion_Description;
    }

    @Override
    public String toString() {
        return "Data{" +
                "Promotion_ID=" + Promotion_ID +
                ", Promotion_Title='" + Promotion_Title + '\'' +
                ", Promotion_Description='" + Promotion_Description + '\'' +
                '}';
    }
}
