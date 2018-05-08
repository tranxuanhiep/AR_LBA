package com.ar_lba.model.JsonPromotion;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;

/**
 * Created by hanson on 08/05/2018.
 */

public class PromotionProgressing {
    @SerializedName("promotionProgressing")
    @Expose
    private ArrayList<PromotionDetail> promotionProgressing;

    public ArrayList<PromotionDetail> getPromotionProgressing() {
        return promotionProgressing;
    }

    public void setPromotionProgressing(ArrayList<PromotionDetail> promotionProgressing) {
        this.promotionProgressing = promotionProgressing;
    }
}
