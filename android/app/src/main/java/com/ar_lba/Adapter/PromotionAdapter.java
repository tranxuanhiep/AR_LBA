package com.ar_lba.Adapter;

import android.content.Context;
import android.os.Bundle;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.ar_lba.R;
import com.ar_lba.model.PromotionForRecycle;
import com.bumptech.glide.Glide;
import com.bumptech.glide.request.RequestOptions;
import com.daimajia.slider.library.Animations.DescriptionAnimation;
import com.daimajia.slider.library.SliderLayout;
import com.daimajia.slider.library.SliderTypes.BaseSliderView;
import com.daimajia.slider.library.SliderTypes.TextSliderView;
import com.daimajia.slider.library.Tricks.ViewPagerEx;


import java.util.HashMap;
import java.util.List;

/**
 * Created by hanson on 24/04/2018.
 */

public class PromotionAdapter extends RecyclerView.Adapter<PromotionAdapter.PromotionViewHolder> implements BaseSliderView.OnSliderClickListener, ViewPagerEx.OnPageChangeListener {
    private Context context;
    List<PromotionForRecycle> listPromotion;

    public PromotionAdapter(Context context, List<PromotionForRecycle> listPromotion) {
        this.context = context;
        this.listPromotion = listPromotion;
    }

    @Override
    public PromotionViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(context);
        View view = inflater.inflate(R.layout.slide_image_item, null);
        return new PromotionViewHolder(view);
    }
    @Override
    public void onBindViewHolder(PromotionViewHolder holder, final int position) {
        PromotionForRecycle promotion = listPromotion.get(position);
        HashMap<String,String> url_maps = new HashMap<String, String>();
        String[] listLinkImages = promotion.getImage().split(",");
        for(int i=0;i<listLinkImages.length;i++){
            if(listLinkImages[i].length()>0){
                url_maps.put(promotion.getExpiry()+","+i, listLinkImages[i]);
            }
        }
        for(String name : url_maps.keySet()){
            TextSliderView textSliderView = new TextSliderView(context);
            String[] getName=name.split(",");
            textSliderView
                    .description("Expiry: "+getName[0])
                    .image(url_maps.get(name))
                    .setScaleType(BaseSliderView.ScaleType.CenterCrop)
                    .setOnSliderClickListener(this);
            textSliderView.bundle(new Bundle());
            textSliderView.getBundle().putString("extra",promotion.getId());
            holder.mDemoSlider.addSlider(textSliderView);
        }
        String setTextComment=null;
        if(promotion.getTotalComment()==0){
            setTextComment="No Comment";
        }
        else if(promotion.getTotalComment()==1){
            setTextComment=promotion.getTotalComment()+" Comment";
        }
        else if(promotion.getTotalComment()>1){
            setTextComment=promotion.getTotalComment()+" Comments";
        }
        String setTextFavorite=null;
        if(promotion.getTotalFavorite()==0){
            setTextFavorite="No Favorite";
        }
        else if(promotion.getTotalFavorite()==1){
            setTextFavorite=promotion.getTotalFavorite()+" Favorite";
        }
        else if(promotion.getTotalFavorite()>1){
            setTextFavorite=promotion.getTotalFavorite()+" Favorites";
        }

        RequestOptions requestOptions = new RequestOptions()
                .placeholder(R.drawable.ic_launcher_background);
        Glide.with(context)
                .load(promotion.getImageStore())
                .apply(requestOptions)
                .into(holder.imgStore);
        holder.tvTotalComments.setText(setTextComment);
        holder.tvTotalFavorite.setText(setTextFavorite);
        holder.tvNameStore.setText(promotion.getName());
        holder.tvAddress.setText(promotion.getTitle());
        holder.mDemoSlider.setPresetTransformer(SliderLayout.Transformer.Accordion);
        holder.mDemoSlider.setPresetIndicator(SliderLayout.PresetIndicators.Right_Top);
        holder.mDemoSlider.setCustomAnimation(new DescriptionAnimation());
        holder.mDemoSlider.setDuration(2000);
        holder.mDemoSlider.addOnPageChangeListener(this);
    }

    @Override
    public int getItemCount() {
        return listPromotion.size();
    }

    @Override
    public void onSliderClick(BaseSliderView slider) {
        Toast.makeText(context,slider.getBundle().get("extra") + "", Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {
    }

    @Override
    public void onPageSelected(int position) {
    }

    @Override
    public void onPageScrollStateChanged(int state) {
    }

    public class PromotionViewHolder extends RecyclerView.ViewHolder{
        private SliderLayout mDemoSlider;
        private TextView tvTotalFavorite, tvTotalComments,tvNameStore,tvAddress;
        private ImageView imgStore;

        public PromotionViewHolder(View itemView) {
            super(itemView);
            mDemoSlider = itemView.findViewById(R.id.slider);
            tvTotalComments = itemView.findViewById(R.id.tvTotalComment);
            tvTotalFavorite = itemView.findViewById(R.id.tvTotalFavorite);
            imgStore = itemView.findViewById(R.id.imgStore);
            tvNameStore = itemView.findViewById(R.id.tvNameStore);
            tvAddress = itemView.findViewById(R.id.tvAddress);
        }
    }
}
