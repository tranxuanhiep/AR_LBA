package com.ar_lba;

/**
 * Created by hilbert on 05/04/2018.
 */

import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Picture;
import android.graphics.Rect;
import android.graphics.Typeface;
import android.graphics.drawable.Drawable;
import android.location.Location;
import android.opengl.Matrix;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;

import com.ar_lba.helper.LocationHelper;
import com.ar_lba.model.ARPoint;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;




/**
 * Created by ntdat on 1/13/17.
 */

public class AROverlayView extends View {

    Context context;
    private float[] rotatedProjectionMatrix = new float[16];
    private Location currentLocation;
    private List<ARPoint> arPoints = new ArrayList<ARPoint>();
    private int canvasWidth = 0;
    private int canvasHeight = 0;


    public AROverlayView(Context context,String promotion, String type) {
        super(context);
        this.context = context;
        try {
            JSONArray arrayPromotion = new JSONArray(promotion);
            if(type=="All"){
                for(int i=0;i<arrayPromotion.length();i++){
                    JSONObject json_data = arrayPromotion.getJSONObject(i);
                    String address = json_data.getString("Store_Street")+","+json_data.getString("Store_Ward")+","+json_data.getString("Store_District");
                    arPoints.add(new ARPoint(json_data.getString("Store_ID"),json_data.getString("Store_Name")
                            ,address,json_data.getString("Distance"),json_data.getDouble("Average_Rating"),json_data.getDouble("Store_Latitude")
                            ,json_data.getDouble("Store_Longitude"),json_data.getInt("NumberOfRating"),0,json_data.getInt("StoreCatalog_ID")));
                }
            }
            else if(type=="1") {
                filterPromotion(1,arrayPromotion);
            }
            else if(type=="2") {
                filterPromotion(2,arrayPromotion);
            }
            else if(type=="3") {
                filterPromotion(3,arrayPromotion);
            }
            else if(type=="4") {
                filterPromotion(4,arrayPromotion);
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }
    public  void filterPromotion(int type, JSONArray arrayPromotion) throws JSONException {
        Log.d("promotion","_"+type);
        for(int i=0;i<arrayPromotion.length();i++){
            JSONObject json_data = arrayPromotion.getJSONObject(i);
            if(json_data.getInt("StoreCatalog_ID")==type){
                String address = json_data.getString("Store_Street")+","+json_data.getString("Store_Ward")+","+json_data.getString("Store_District");
                arPoints.add(new ARPoint(json_data.getString("Store_ID"),json_data.getString("Store_Name")
                        ,address,json_data.getString("Distance"),json_data.getDouble("Average_Rating"),json_data.getDouble("Store_Latitude")
                        ,json_data.getDouble("Store_Longitude"),json_data.getInt("NumberOfRating"),0,json_data.getInt("StoreCatalog_ID")));
            }
        }
    }
    public double getAltitude(double lat, double lon){

        return 0;
    }
    public void updateRotatedProjectionMatrix(float[] rotatedProjectionMatrix) {
        this.rotatedProjectionMatrix = rotatedProjectionMatrix;
        this.invalidate();
    }

    public void updateCurrentLocation(Location currentLocation){
        this.currentLocation = currentLocation;
        this.invalidate();
    }

    @Override
    public boolean onTouchEvent(MotionEvent event) {
        if(event.getAction() == MotionEvent.ACTION_DOWN){
            return true;
        }if(event.getAction() == MotionEvent.ACTION_UP){
            if(checkTouchOn(event)!=""){
                Intent a = new Intent(getContext(), TabActivity.class);
                a.putExtra("IDSTORE",checkTouchOn(event));
                a.putExtra("LAT",String.valueOf(currentLocation.getLatitude()));
                a.putExtra("LNG",String.valueOf(currentLocation.getLongitude()));
                context.startActivity(a);
            }
            return false;
        }
        return super.onTouchEvent(event);
    }

    @Override
    protected void onDraw(Canvas canvas) {

        super.onDraw(canvas);

        if (currentLocation == null) {
            return;
        }

        canvasWidth = canvas.getWidth();
        canvasHeight = canvas.getHeight();
        
        Paint paint = new Paint(Paint.ANTI_ALIAS_FLAG);
        paint.setStyle(Paint.Style.FILL);
        paint.setColor(Color.BLACK);
        paint.setShadowLayer(10.0f, 0.0f, 2.0f, 0xff888888);
        paint.setTypeface(Typeface.create(Typeface.DEFAULT, Typeface.NORMAL));
        paint.setTextSize(50);

        Paint Paintimage = new Paint(Paint.ANTI_ALIAS_FLAG);

        Paint paintBG = new Paint(Paint.ANTI_ALIAS_FLAG);
        paintBG.setStyle(Paint.Style.FILL);
        paintBG.setColor(Color.parseColor("#f5f5f5"));
        paintBG.setShadowLayer(10.0f, 0.0f, 2.0f, 0xff888888);
        paintBG.setTypeface(Typeface.create(Typeface.DEFAULT, Typeface.BOLD));
        paintBG.setTextSize(60);

        Paint paintTextAddress = new Paint(Paint.ANTI_ALIAS_FLAG);
        paintTextAddress.setStyle(Paint.Style.FILL);
        paintTextAddress.setColor(Color.parseColor("#2d261a"));
        paintTextAddress.setShadowLayer(10.0f, 0.0f, 2.0f, 0xff888888);
        paintTextAddress.setTypeface(Typeface.create(Typeface.DEFAULT, Typeface.ITALIC));
        paintTextAddress.setTextSize(30);




        for (int i = 0; i < arPoints.size(); i ++) {
            float[] currentLocationInECEF = LocationHelper.WSG84toECEF(currentLocation);
            float[] pointInECEF = LocationHelper.WSG84toECEF(arPoints.get(i).getLocation());
            float[] pointInENU = LocationHelper.ECEFtoENU(currentLocation, currentLocationInECEF, pointInECEF);

            float[] cameraCoordinateVector = new float[4];
            Matrix.multiplyMV(cameraCoordinateVector, 0, rotatedProjectionMatrix, 0, pointInENU, 0);


            Bitmap ratehalf = BitmapFactory.decodeResource(getResources(),R.drawable.ratehalf);
            Bitmap ratefull = BitmapFactory.decodeResource(getResources(),R.drawable.rate);
            Bitmap rateemtry = BitmapFactory.decodeResource(getResources(),R.drawable.rateemtry);
            Bitmap bitmap = BitmapFactory.decodeResource(getResources(), R.drawable.other);
            if(arPoints.get(i).getType()==1){
                 bitmap = BitmapFactory.decodeResource(getResources(), R.drawable.coffee);
            }
            else if(arPoints.get(i).getType()==2){
                 bitmap = BitmapFactory.decodeResource(getResources(), R.drawable.fashion);
            }
            else if(arPoints.get(i).getType()==3){
                 bitmap = BitmapFactory.decodeResource(getResources(), R.drawable.enter);
            }
            // cameraCoordinateVector[2] is z, that always less than 0 to display on right position
            // if z > 0, the point will display on the opposite
            if (cameraCoordinateVector[2] < 0) {
                float x  = (0.5f + cameraCoordinateVector[0]/cameraCoordinateVector[3]) * canvas.getWidth();
                float y = (0.5f - cameraCoordinateVector[1]/cameraCoordinateVector[3]) * canvas.getHeight();
                float Hight = bitmap.getHeight();
                float left;
                float right;
                if(arPoints.get(i).getName().length()>10){
                    left = (x - (30 * arPoints.get(i).getName().length() / 2)) - 80-bitmap.getWidth()/2;
                    right = left + 30 * arPoints.get(i).getName().length() + 80 * 2+bitmap.getWidth()/2;
                }
                else {left = (x - (6*rateemtry.getWidth())) - 80-bitmap.getWidth()/2+20;
                    right = left + 6*rateemtry.getWidth() + 80 * 2+bitmap.getWidth()/2+20;
                }
                float top = y + Hight/2 +10;

                float bottom = y - Hight/2 +10;
                Rect rect = new Rect((int)left,(int)top,(int)right, (int)bottom);
                String[] addressParts = arPoints.get(i).getAddress().split(",");
                //draw border
                canvas.drawRect(rect, paintBG);
                //draw Image store
                canvas.drawBitmap(bitmap, left, bottom, paint);
//                canvas.drawCircle(x, y, radius, paint);
                //draw name store
                canvas.drawText(arPoints.get(i).getName(), left + bitmap.getWidth() ,bottom +Hight/2-20, paint);
                //draw distance
                canvas.drawText(arPoints.get(i).getDistance(),left + bitmap.getWidth() + 27*arPoints.get(i).getName().length() ,bottom +Hight/2-20,paintTextAddress);
                //draw address
                canvas.drawText(addressParts[0]+", "+addressParts[1]+", "+addressParts[2],left + bitmap.getWidth() ,bottom +Hight/2+15, paintTextAddress);
                //DRAW RATE
                double rate  = arPoints.get(i).getRate();
                int leftrate = 0;
                for(int j = 0; j<5;j++){
                    if(rate>1)
                        canvas.drawBitmap(ratefull,left + bitmap.getWidth()+leftrate,bottom +Hight/2+25,Paintimage);
                    else
                    if(rate>0)
                        canvas.drawBitmap(ratehalf,left + bitmap.getWidth()+leftrate,bottom +Hight/2+25,Paintimage);
                    else
                        canvas.drawBitmap(rateemtry,left + bitmap.getWidth()+leftrate,bottom +Hight/2+25,Paintimage);
                    leftrate = leftrate+ratefull.getWidth();
                    rate--;
                }
                //Draw number viewer
                canvas.drawText("( "+reviewOrReviews(arPoints.get(i).getNumberView())+" )",left+20 + bitmap.getWidth()+leftrate,top-15, paintTextAddress);
            }
        }
    }
    private String reviewOrReviews(int i){
        if(i==0){
            return "No review";
        }
        else if(i==1) {
            return i+" review";
        }
        else {
            return i+" reviews";
        }
    }
    private String checkTouchOn(MotionEvent event){
        if(canvasHeight == 0 || canvasWidth == 0) return "";
        int ey = (int) event.getY();
        int ex = (int) event.getX();
        for (int i = arPoints.size() - 1; i >=0; i --) {
            float[] currentLocationInECEF = LocationHelper.WSG84toECEF(currentLocation);
            float[] pointInECEF = LocationHelper.WSG84toECEF(arPoints.get(i).getLocation());
            float[] pointInENU = LocationHelper.ECEFtoENU(currentLocation, currentLocationInECEF, pointInECEF);

            float[] cameraCoordinateVector = new float[4];
            Matrix.multiplyMV(cameraCoordinateVector, 0, rotatedProjectionMatrix, 0, pointInENU, 0);
            Bitmap rateemtry = BitmapFactory.decodeResource(getResources(),R.drawable.rateemtry);
            Bitmap bitmap = BitmapFactory.decodeResource(getResources(), R.drawable.avc);

            // cameraCoordinateVector[2] is z, that always less than 0 to display on right position
            // if z > 0, the point will display on the opposite
            if (cameraCoordinateVector[2] < 0) {

                float x  = (0.5f + cameraCoordinateVector[0]/cameraCoordinateVector[3]) *canvasWidth;
                float y = (0.5f - cameraCoordinateVector[1]/cameraCoordinateVector[3]) * canvasHeight;
                float Hight = bitmap.getHeight();
                float left;
                float right;

                if(arPoints.get(i).getName().length()>10){
                    left = (x - (30 * arPoints.get(i).getName().length() / 2)) - 80-bitmap.getWidth()/2;
                    right = left + 30 * arPoints.get(i).getName().length() + 80 * 2+bitmap.getWidth()/2;
                }
                else {left = (x - (6*rateemtry.getWidth())) - 80-bitmap.getWidth()/2+20;
                    right = left + 6*rateemtry.getWidth() + 80 * 2+bitmap.getWidth()/2+20;
                }

                float top = y + Hight/2 +10;

                float bottom = y - Hight/2 +10;
                Rect rect = new Rect((int)left,(int)top,(int)right, (int)bottom);
                if(ey < top && ey > bottom && ex > left && ex < right){
                    return arPoints.get(i).getID();
                }
            }
        }
        return "";
    }
}
