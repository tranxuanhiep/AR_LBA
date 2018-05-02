package com.ar_lba.Adapter;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentStatePagerAdapter;
import android.support.v4.view.PagerAdapter;
import android.util.Log;

import com.ar_lba.Fragment.Promotion_Fragment;
import com.ar_lba.Fragment.Store_Fragment;

/**
 * Created by hanson on 02/05/2018.
 */

public class AdapterTab extends FragmentStatePagerAdapter {
    Promotion_Fragment promotion_Fragment;
    Store_Fragment store_Fragment;
    String Id= "";
    String Lat= "";
    String Lng= "";
    public AdapterTab(FragmentManager fm, String ID, String LAT, String LNG) {
        super(fm);
        store_Fragment= new Store_Fragment();
        promotion_Fragment=new Promotion_Fragment();
        Id=ID;
        Lat=LAT;
        Lng=LNG;
        Log.d("123456 Adapter",Id +"__"+Lat+"__"+Lng);
    }
    @Override
    public Fragment getItem(int position) {
        switch (position)
        {
            case 0:
                Bundle bundle = new Bundle();
                bundle.putString("ID",Id);
                bundle.putString("LAT",Lat);
                bundle.putString("LNG",Lng);
                store_Fragment.setArguments(bundle);
                return  store_Fragment;
            case 1:
                Bundle bundle1 = new Bundle();
                bundle1.putString("ID",Id);
                promotion_Fragment.setArguments(bundle1);
                return promotion_Fragment;
            default: return null;
        }
    }
    @Override
    public int getCount() {
        return 2;
    }
}


