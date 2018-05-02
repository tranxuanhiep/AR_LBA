package com.ar_lba.model.JsonStore;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

/**
 * Created by hanson on 26/04/2018.
 */

public class StoreDetail {
    @SerializedName("Store_Name")
    @Expose
    private String Store_Name;

    @SerializedName("Store_District")
    @Expose
    private String Store_District;

    @SerializedName("Store_Ward")
    @Expose
    private String Store_Ward;

    @SerializedName("Store_Street")
    @Expose
    private String Store_Street;

    @SerializedName("Store_OpenTime")
    @Expose
    private String Store_OpenTime;

    @SerializedName("Store_CloseTime")
    @Expose
    private String Store_CloseTime;

    @SerializedName("Distance")
    @Expose
    private String Distance;

    @SerializedName("Duration")
    @Expose
    private String Duration;

    @SerializedName("Store_ImageLink")
    @Expose
    private String Store_ImageLink;

    @SerializedName("Average_Rating")
    @Expose
    private double Average_Rating;

    @SerializedName("NumberOfRating")
    @Expose
    private int NumberOfRating;

    @SerializedName("Store_Description")
    @Expose
    private String Store_Description;

    @SerializedName("Store_PhoneNumber")
    @Expose
    private String Store_PhoneNumber;

    @SerializedName("Store_PriceMin")
    @Expose
    private int Store_PriceMin;

    @SerializedName("Store_PriceMax")
    @Expose
    private int Store_PriceMax;

    @SerializedName("Store_ID")
    @Expose
    private int Store_ID;

    @SerializedName("Store_ImageList")
    @Expose
    private String Store_ImageList;

    @SerializedName("Store_Longitude")
    @Expose
    private String Store_Longitude;

    @SerializedName("Store_Latitude")
    @Expose
    private String Store_Latitude;

    public String getStore_Name() {
        return Store_Name;
    }

    public void setStore_Name(String store_Name) {
        Store_Name = store_Name;
    }

    public String getStore_District() {
        return Store_District;
    }

    public void setStore_District(String store_District) {
        Store_District = store_District;
    }

    public String getStore_Ward() {
        return Store_Ward;
    }

    public void setStore_Ward(String store_Ward) {
        Store_Ward = store_Ward;
    }

    public String getStore_Street() {
        return Store_Street;
    }

    public void setStore_Street(String store_Street) {
        Store_Street = store_Street;
    }

    public String getStore_OpenTime() {
        return Store_OpenTime;
    }

    public void setStore_OpenTime(String store_OpenTime) {
        Store_OpenTime = store_OpenTime;
    }

    public String getStore_CloseTime() {
        return Store_CloseTime;
    }

    public void setStore_CloseTime(String store_CloseTime) {
        Store_CloseTime = store_CloseTime;
    }

    public String getDistance() {
        return Distance;
    }

    public void setDistance(String distance) {
        Distance = distance;
    }

    public String getDuration() {
        return Duration;
    }

    public void setDuration(String duration) {
        Duration = duration;
    }

    public String getStore_ImageLink() {
        return Store_ImageLink;
    }

    public void setStore_ImageLink(String store_ImageLink) {
        Store_ImageLink = store_ImageLink;
    }

    public double getAverage_Rating() {
        return Average_Rating;
    }

    public void setAverage_Rating(double average_Rating) {
        Average_Rating = average_Rating;
    }

    public int getNumberOfRating() {
        return NumberOfRating;
    }

    public void setNumberOfRating(int numberOfRating) {
        NumberOfRating = numberOfRating;
    }

    public String getStore_Description() {
        return Store_Description;
    }

    public void setStore_Description(String store_Description) {
        Store_Description = store_Description;
    }

    public String getStore_PhoneNumber() {
        return Store_PhoneNumber;
    }

    public void setStore_PhoneNumber(String store_PhoneNumber) {
        Store_PhoneNumber = store_PhoneNumber;
    }

    public int getStore_PriceMin() {
        return Store_PriceMin;
    }

    public void setStore_PriceMin(int store_PriceMin) {
        Store_PriceMin = store_PriceMin;
    }

    public int getStore_PriceMax() {
        return Store_PriceMax;
    }

    public void setStore_PriceMax(int store_PriceMax) {
        Store_PriceMax = store_PriceMax;
    }

    public int getStore_ID() {
        return Store_ID;
    }

    public void setStore_ID(int store_ID) {
        Store_ID = store_ID;
    }

    public String getStore_ImageList() {
        return Store_ImageList;
    }

    public void setStore_ImageList(String store_ImageList) {
        Store_ImageList = store_ImageList;
    }

    public String getStore_Longitude() {
        return Store_Longitude;
    }

    public void setStore_Longitude(String store_Longitude) {
        Store_Longitude = store_Longitude;
    }

    public String getStore_Latitude() {
        return Store_Latitude;
    }

    public void setStore_Latitude(String store_Latitude) {
        Store_Latitude = store_Latitude;
    }

    @Override
    public String toString() {
        return "StoreDetail{" +
                "Store_Name='" + Store_Name + '\'' +
                ", Store_District='" + Store_District + '\'' +
                ", Store_Ward='" + Store_Ward + '\'' +
                ", Store_Street='" + Store_Street + '\'' +
                ", Store_OpenTime='" + Store_OpenTime + '\'' +
                ", Store_CloseTime='" + Store_CloseTime + '\'' +
                ", Distance='" + Distance + '\'' +
                ", Duration='" + Duration + '\'' +
                ", Store_ImageLink='" + Store_ImageLink + '\'' +
                ", Average_Rating=" + Average_Rating +
                ", NumberOfRating=" + NumberOfRating +
                ", Store_Description='" + Store_Description + '\'' +
                ", Store_PhoneNumber='" + Store_PhoneNumber + '\'' +
                ", Store_PriceMin=" + Store_PriceMin +
                ", Store_PriceMax=" + Store_PriceMax +
                ", Store_ID=" + Store_ID +
                ", Store_ImageList='" + Store_ImageList + '\'' +
                ", Store_Longitude='" + Store_Longitude + '\'' +
                ", Store_Latitude='" + Store_Latitude + '\'' +
                '}';
    }
}

