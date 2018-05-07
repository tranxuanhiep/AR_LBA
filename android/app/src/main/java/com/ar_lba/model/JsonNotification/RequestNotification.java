package com.ar_lba.model.JsonNotification;

/**
 * Created by hanson on 05/05/2018.
 */

public class RequestNotification {
    private String Username;
    private int Radian;
    private String lat;
    private String lng;

    public RequestNotification(String username, int radian, String lat, String lng) {
        Username = username;
        Radian = radian;
        this.lat = lat;
        this.lng = lng;
    }

    public String getUsername() {
        return Username;
    }

    public void setUsername(String username) {
        Username = username;
    }

    public int getRadian() {
        return Radian;
    }

    public void setRadian(int radian) {
        Radian = radian;
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
