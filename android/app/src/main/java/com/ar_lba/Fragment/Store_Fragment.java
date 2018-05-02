package com.ar_lba.Fragment;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.StaggeredGridLayoutManager;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.RatingBar;
import android.widget.ScrollView;
import android.widget.TextView;

import com.ar_lba.API.StoreInterface;
import com.ar_lba.Adapter.StaggeredRecyclerViewAdapter;
import com.ar_lba.R;
import com.ar_lba.model.JsonStore.Request;
import com.ar_lba.model.JsonStore.Store;
import com.ar_lba.model.JsonStore.StoreDetail;
import com.borjabravo.readmoretextview.ReadMoreTextView;
import com.bumptech.glide.Glide;
import com.bumptech.glide.request.RequestOptions;

import java.util.ArrayList;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

/**
 * Created by hanson on 19/04/2018.
 */

public class Store_Fragment extends Fragment {
    private static final int NUM_COLUMNS = 2;
    private ImageView imageHead;
    private TextView tvStore,tvTotalReview,tvAddress,tvMinPrice,tvMaxPrice,tvEstimateKm,tvEstimateTime,tvTimeOpen,tvTimeClose;
    private RatingBar ratingBar;
    private ReadMoreTextView tvDescribe;
    private RecyclerView recyclerView;
    private ScrollView lnData;
    private ProgressBar lnLoad;
    int Id;
    String Lat= "";
    String Lng= "";
    @Nullable
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view=inflater.inflate(R.layout.activity_store,container,false);
        Bundle bundle = getArguments();
        if(bundle!=null){
            Id = Integer.parseInt(bundle.getString("ID"));
            Lat = bundle.getString("LAT");
            Lng = bundle.getString("LNG");
            Log.d("123456 Fragment Store",Id+"__"+Lat+"__"+Lng);
        }
        lnLoad =view.findViewById(R.id.load);
        lnData = view.findViewById(R.id.lnData);
        lnLoad.setVisibility(View.VISIBLE);
        lnData.setVisibility(View.GONE);
        recyclerView =view.findViewById(R.id.recyclerView);
        imageHead = view.findViewById(R.id.imgStore);
        tvStore = view.findViewById(R.id.tvNameOfStore);
        tvDescribe =view.findViewById(R.id.tvDescribe);
        tvAddress = view.findViewById(R.id.tvAddress);
        tvMinPrice =view.findViewById(R.id.tvMinPrice);
        tvMaxPrice = view.findViewById(R.id.tvMaxPrice);
        tvEstimateKm =view.findViewById(R.id.tvEstimateKm);
        tvEstimateTime = view.findViewById(R.id.tvEstimateTime);
        tvTimeOpen =view.findViewById(R.id.tvTimeOpen);
        tvTimeClose = view.findViewById(R.id.tvTimeClose);
        ratingBar =view.findViewById(R.id.ratingBar);
        tvTotalReview=view.findViewById(R.id.tvTotalReview);
        Request request = new Request(Id,Lat,Lng);
        sendRequest(request);
        return view;
    }
    private void setImagePage(String url) {
        RequestOptions requestOptions = new RequestOptions()
                .placeholder(R.drawable.ic_launcher_background);
        String image =url;
        Glide.with(this)
                .load(image)
                .apply(requestOptions)
                .into(imageHead);
    }
    private void sendRequest(Request request){
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("http://lbawebserver.us-east-1.elasticbeanstalk.com")
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        StoreInterface storeInterface = retrofit.create(StoreInterface.class);
        Call<Store> call = storeInterface.getData(request);
        call.enqueue(new Callback<Store>() {
            @Override
            public void onResponse(Call<Store> call, Response<Store> response) {
                String totalReview = null;
                StoreDetail storeDetail = response.body().getData().getStore_DetailsViewModel();
                setImagePage(storeDetail.getStore_ImageLink());
                String[] parts = storeDetail.getStore_ImageList().split(",");
                ArrayList<String> mImageUrls = new ArrayList<>();
                for(int i=0;i< parts.length;i++) {
                    if(parts[i]!="")
                        mImageUrls.add(parts[i]);
                }
                listImage(mImageUrls);
                tvStore.setText(storeDetail.getStore_Name());
                tvDescribe.setText(storeDetail.getStore_Description());
                ratingBar.setRating((float) storeDetail.getAverage_Rating());
                tvAddress.setText(storeDetail.getStore_Street()+", "+storeDetail.getStore_District());
                tvMinPrice.setText(storeDetail.getStore_PriceMin()+" VND");
                tvMaxPrice.setText(storeDetail.getStore_PriceMax()+" VND");
                tvEstimateKm.setText(storeDetail.getDuration());
                tvEstimateTime.setText(storeDetail.getDistance());
                tvTimeOpen.setText(storeDetail.getStore_OpenTime());
                tvTimeClose.setText(storeDetail.getStore_CloseTime());
                if(storeDetail.getNumberOfRating()==0)
                {
                    totalReview= "No review";
                }
                else if(storeDetail.getNumberOfRating()==1){
                    totalReview= storeDetail.getNumberOfRating()+" review";
                }
                else if(storeDetail.getNumberOfRating()>1){
                    totalReview= storeDetail.getNumberOfRating()+" reviews";
                }
                tvTotalReview.setText("( "+totalReview+" )");
                lnLoad.setVisibility(View.GONE);
                lnData.setVisibility(View.VISIBLE);
            }
            @Override
            public void onFailure(Call<Store> call, Throwable t) {
                Log.d("Error","Error"+t.getMessage());
            }
        });
    }
    public void listImage(ArrayList<String> images){
        StaggeredRecyclerViewAdapter staggeredRecyclerViewAdapter =
                new StaggeredRecyclerViewAdapter(getActivity(), images);
        StaggeredGridLayoutManager staggeredGridLayoutManager = new StaggeredGridLayoutManager(NUM_COLUMNS, LinearLayoutManager.VERTICAL);
        recyclerView.setLayoutManager(staggeredGridLayoutManager);
        recyclerView.setAdapter(staggeredRecyclerViewAdapter);
    }
}