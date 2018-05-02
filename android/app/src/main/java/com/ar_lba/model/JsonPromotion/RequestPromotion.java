package com.ar_lba.model.JsonPromotion;

/**
 * Created by hanson on 27/04/2018.
 */

public class RequestPromotion {
    private int Store_ID;
    private String Username;

    public RequestPromotion(int store_ID, String username) {
        Store_ID = store_ID;
        Username = username;
    }

    public int getStore_ID() {
        return Store_ID;
    }

    public void setStore_ID(int store_ID) {
        Store_ID = store_ID;
    }

    public String getUsername() {
        return Username;
    }

    public void setUsername(String username) {
        Username = username;
    }
}
