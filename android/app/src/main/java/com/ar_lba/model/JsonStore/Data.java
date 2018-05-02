package com.ar_lba.model.JsonStore;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

/**
 * Created by hanson on 26/04/2018.
 */

public class Data {
    @SerializedName("Store_DetailsViewModel")
    @Expose
    private StoreDetail Store_DetailsViewModel;

    public StoreDetail getStore_DetailsViewModel() {
        return Store_DetailsViewModel;
    }

    public void setStore_DetailsViewModel(StoreDetail store_DetailsViewModel) {
        Store_DetailsViewModel = store_DetailsViewModel;
    }

    @Override
    public String toString() {
        return "Data{" +
                "Store_DetailsViewModel=" + Store_DetailsViewModel +
                '}';
    }
}
