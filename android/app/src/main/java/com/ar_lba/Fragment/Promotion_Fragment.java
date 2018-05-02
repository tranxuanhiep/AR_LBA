package com.ar_lba.Fragment;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.Toast;

import com.ar_lba.API.PromotionInterface;
import com.ar_lba.Adapter.PromotionAdapter;
import com.ar_lba.R;
import com.ar_lba.model.JsonPromotion.Promotion;
import com.ar_lba.model.JsonPromotion.PromotionDetail;
import com.ar_lba.model.JsonPromotion.RequestPromotion;
import com.ar_lba.model.PromotionForRecycle;
import com.bumptech.glide.Glide;
import com.bumptech.glide.request.RequestOptions;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

/**
 * Created by hanson on 19/04/2018.
 */

public class Promotion_Fragment extends Fragment {
    RecyclerView rcPromotion;
    ProgressBar load;
    ImageView imageNull;
    int Id;
    @Nullable
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view=inflater.inflate(R.layout.activity_promotion,container,false);
        Bundle bundle = getArguments();
        if(bundle!=null){
            Id = Integer.parseInt(bundle.getString("ID"));
            Log.d("123456 Promotion",Id+"");
        }
        imageNull= view.findViewById(R.id.imageNull);
        rcPromotion = view.findViewById(R.id.rcPromotion);
        load = view.findViewById(R.id.load);
        rcPromotion.setVisibility(View.GONE);
        load.setVisibility(View.VISIBLE);
        rcPromotion.setHasFixedSize(true);
        rcPromotion.setLayoutManager(new LinearLayoutManager(getContext()));
        RequestPromotion requestPromotion = new RequestPromotion(Id,"phamvanhan68@gmail.com");
        sendRequest(requestPromotion);
        return view;
    }
    private void sendRequest(RequestPromotion request){
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("http://lbawebserver.us-east-1.elasticbeanstalk.com")
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        PromotionInterface promotionInterface = retrofit.create(PromotionInterface.class);
        Call<Promotion> call = promotionInterface.getData(request);
        call.enqueue(new Callback<Promotion>() {
            @Override
            public void onResponse(Call<Promotion> call, Response<Promotion> response) {

                ArrayList<PromotionDetail> arrayList = response.body().getData();
                if(arrayList.size()>0){
                    List<PromotionForRecycle> promotionList1 = new ArrayList<>();
                    for(int i = 0; i < arrayList.size(); i++){
                        String []timeStart =arrayList.get(i).getPromotion_DateStart().split("T");
                        String []timeEnd =arrayList.get(i).getPromotion_DateEnd().split("T");
                        promotionList1.add( new PromotionForRecycle(arrayList.get(i).getPromotion_ID(),arrayList.get(i).getPromotion_Title(),arrayList.get(i).getPromotion_Image(),arrayList.get(i).getTotalFavorite(),arrayList.get(i).getTotalComment(), arrayList.get(i).getStore_Name(),timeStart[0]+" - "+timeEnd[0],arrayList.get(i).getStore_ImageLink()));
                    }
                    PromotionAdapter adapter = new PromotionAdapter(getActivity(), promotionList1);
                    rcPromotion.setAdapter(adapter);
                    rcPromotion.setVisibility(View.VISIBLE);
                    load.setVisibility(View.GONE);
                    imageNull.setVisibility(View.GONE);
                }
                else {
                    rcPromotion.setVisibility(View.GONE);
                    load.setVisibility(View.GONE);
                    imageNull.setVisibility(View.VISIBLE);
                }
            }

            @Override
            public void onFailure(Call<Promotion> call, Throwable t) {
                Log.d("Error",t.getMessage()+"");
            }
        });
    }
}
