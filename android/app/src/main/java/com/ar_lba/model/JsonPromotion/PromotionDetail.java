package com.ar_lba.model.JsonPromotion;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

/**
 * Created by hanson on 27/04/2018.
 */

public class PromotionDetail {

    @SerializedName("checkFavorite")
    @Expose
    private boolean checkFavorite;
    @SerializedName("Promotion_ID")
    @Expose
    private String Promotion_ID;
    @SerializedName("Promotion_Title")
    @Expose
    private String Promotion_Title;
    @SerializedName("Promotion_Description")
    @Expose
    private String Promotion_Description;
    @SerializedName("Promotion_Image")
    @Expose
    private String Promotion_Image  ;
    @SerializedName("TotalFavorite")
    @Expose
    private int TotalFavorite;
    @SerializedName("TotalComment")
    @Expose
    private int TotalComment  ;
    @SerializedName("Store_Details_ID")
    @Expose
    private int Store_Details_ID;
    @SerializedName("Store_Name")
    @Expose
    private String Store_Name;
    @SerializedName("Store_ImageLink")
    @Expose
    private String Store_ImageLink;
    @SerializedName("Promotion_DateStart")
    @Expose
    private String Promotion_DateStart;
    @SerializedName("Promotion_DateEnd")
    @Expose
    private String Promotion_DateEnd;
    @SerializedName("Promotion_Created")
    @Expose
    private String Promotion_Created;

    public String getPromotion_Title() {
        return Promotion_Title;
    }

    public void setPromotion_Title(String promotion_Title) {
        Promotion_Title = promotion_Title;
    }

    public String getPromotion_Image() {
        return Promotion_Image;
    }

    public void setPromotion_Image(String promotion_Image) {
        Promotion_Image = promotion_Image;
    }

    public String getPromotion_ID() {
        return Promotion_ID;
    }

    public void setPromotion_ID(String promotion_ID) {
        Promotion_ID = promotion_ID;
    }

    public int getTotalComment() {
        return TotalComment;
    }

    public void setTotalComment(int totalComment) {
        TotalComment = totalComment;
    }

    public int getTotalFavorite() {
        return TotalFavorite;
    }

    public void setTotalFavorite(int totalFavorite) {
        TotalFavorite = totalFavorite;
    }

    public boolean getCheckFavorite() {
        return checkFavorite;
    }

    public void setCheckFavorite(boolean checkFavorite) {
        this.checkFavorite = checkFavorite;
    }

    public String getPromotion_Description() {
        return Promotion_Description;
    }

    public void setPromotion_Description(String promotion_Description) {
        Promotion_Description = promotion_Description;
    }

    public int getStore_Details_ID() {
        return Store_Details_ID;
    }

    public void setStore_Details_ID(int store_Details_ID) {
        Store_Details_ID = store_Details_ID;
    }

    public String getStore_Name() {
        return Store_Name;
    }

    public void setStore_Name(String store_Name) {
        Store_Name = store_Name;
    }

    public String getStore_ImageLink() {
        return Store_ImageLink;
    }

    public void setStore_ImageLink(String store_ImageLink) {
        Store_ImageLink = store_ImageLink;
    }

    public String getPromotion_DateStart() {
        return Promotion_DateStart;
    }

    public void setPromotion_DateStart(String promotion_DateStart) {
        Promotion_DateStart = promotion_DateStart;
    }

    public String getPromotion_DateEnd() {
        return Promotion_DateEnd;
    }

    public void setPromotion_DateEnd(String promotion_DateEnd) {
        Promotion_DateEnd = promotion_DateEnd;
    }

    public String getPromotion_Created() {
        return Promotion_Created;
    }

    public void setPromotion_Created(String promotion_Created) {
        Promotion_Created = promotion_Created;
    }

    @Override
    public String toString() {
        return "PromotionDetail{" +
                "Promotion_Title='" + Promotion_Title + '\'' +
                ", Promotion_Image='" + Promotion_Image + '\'' +
                ", Promotion_ID='" + Promotion_ID + '\'' +
                ", TotalComment=" + TotalComment +
                ", TotalFavorite=" + TotalFavorite +
                ", checkFavorite='" + checkFavorite + '\'' +
                ", Promotion_Description='" + Promotion_Description + '\'' +
                ", Store_Details_ID=" + Store_Details_ID +
                ", Store_Name='" + Store_Name + '\'' +
                ", Store_ImageLink='" + Store_ImageLink + '\'' +
                ", Promotion_DateStart='" + Promotion_DateStart + '\'' +
                ", Promotion_DateEnd='" + Promotion_DateEnd + '\'' +
                ", Promotion_Created='" + Promotion_Created + '\'' +
                '}';
    }
}
