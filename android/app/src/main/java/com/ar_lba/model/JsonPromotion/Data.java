package com.ar_lba.model.JsonPromotion;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;

/**
 * Created by hanson on 27/04/2018.
 */

public class Data {
    @SerializedName("promotionDetails")
    @Expose
    private ArrayList<PromotionDetail> promotionDetails;

    public ArrayList<PromotionDetail> getPromotionDetails() {
        return promotionDetails;
    }

    public void setPromotionDetails(ArrayList<PromotionDetail> promotionDetails) {
        this.promotionDetails = promotionDetails;
    }

}
