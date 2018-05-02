package com.ar_lba.model.JsonStore;

/**
 * Created by hanson on 26/04/2018.
 */

public class Request {
    private int Store_ID;
    private String lat;
    private String lng;

    public Request(int store_ID, String lat, String lng) {
        Store_ID = store_ID;
        this.lat = lat;
        this.lng = lng;
    }

    public int getStore_ID() {
        return Store_ID;
    }

    public void setStore_ID(int store_ID) {
        Store_ID = store_ID;
    }

    public String getLat() {
        return lat;
    }

    public void setLat(String lat) {
        this.lat = lat;
    }

    public String getLng() {
        return lng;
    }

    public void setLng(String lng) {
        this.lng = lng;
    }
}
