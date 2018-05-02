package com.ar_lba;

import android.content.Intent;
import android.support.annotation.IdRes;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.RadioButton;
import android.widget.RadioGroup;

import com.ar_lba.Adapter.AdapterTab;

public class TabActivity extends AppCompatActivity implements ViewPager.OnPageChangeListener ,RadioGroup.OnCheckedChangeListener {
    ViewPager vpHomePage;
    RadioButton rdStore , rdPromotion;
    RadioGroup grHomepage;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_tab);
        Intent intent = getIntent();
        String ID = intent.getStringExtra("IDSTORE");
        String LAT = intent.getStringExtra("LAT");
        String LNG = intent.getStringExtra("LNG");
        vpHomePage =findViewById(R.id.vpHomepage);
        rdStore= findViewById(R.id.rd_Store);
        rdPromotion= findViewById(R.id.rd_Promotion);
        grHomepage= findViewById(R.id.grHomepage);
        AdapterTab adapterViewPagerHomePage=new AdapterTab(getSupportFragmentManager(),ID,LAT,LNG);
        vpHomePage.setAdapter(adapterViewPagerHomePage);
        vpHomePage.addOnPageChangeListener(this);
        grHomepage.setOnCheckedChangeListener(this);
    }
    @Override
    public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {

    }

    @Override
    public void onPageSelected(int position) {
        switch (position)
        {
            case 0:
                rdStore.setChecked(true);
                break;
            case 1:
                rdPromotion.setChecked(true);
                break;
        }

    }

    @Override
    public void onPageScrollStateChanged(int state) {
    }

    @Override
    public void onCheckedChanged(RadioGroup radioGroup, @IdRes int i) {
        switch (i)
        {
            case R.id.rd_Store:
                vpHomePage.setCurrentItem(0);
                break;
            case R.id.rd_Promotion:
                vpHomePage.setCurrentItem(1);
                break;
        }
    }
}
