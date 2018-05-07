package com.ar_lba;

import android.app.IntentService;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.content.SharedPreferences;
import android.location.Location;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.NotificationCompat;
import android.util.Log;

import com.ar_lba.API.NotificationInterface;
import com.ar_lba.model.JsonNotification.DetailsNotification;
import com.ar_lba.model.JsonNotification.Notification;
import com.ar_lba.model.JsonNotification.RequestNotification;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;

import java.util.ArrayList;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

/**
 * Created by hanson on 03/05/2018.
 */

public class TimeCountDown extends IntentService {
    int time = 2;
    int timeRunTask = 1800000;
    double lattitude, longitude;
    String username;
    String tittle;
    String describe;
    String USER_NAME = "USERNAME";
    String USER_NAME_FOR_TASK_BACKGROUND = "USERNAMEFORTASKBACKGROUND";
    private FusedLocationProviderClient client;
    public TimeCountDown() {
        super("Time Service");
    }

    @Override
    public void onCreate() {
        super.onCreate();
        Log.d("Task", "Task running");
    }

    @Override
    public int onStartCommand(@Nullable Intent intent, int flags, int startId) {
        super.onStartCommand(intent, flags, startId);
        return START_STICKY;
    }
    public void getLocationAndUsername(){
        client = LocationServices.getFusedLocationProviderClient(this);
        try {
            final Task location = client.getLastLocation();
            location.addOnCompleteListener(new OnCompleteListener() {
                @Override
                public void onComplete(@NonNull Task task) {
                    if(task.isSuccessful()){
                        Location currentLocation = (Location) task.getResult();
                        lattitude = currentLocation.getLatitude();
                        longitude = currentLocation.getLongitude();
                        GetPromotion();
                    }else{
                        Log.d("Task", "onComplete: current location is null");
                    }
                }
            });

        }catch (SecurityException e){

        }
        SharedPreferences sharedPreferences = getSharedPreferences(USER_NAME,MODE_PRIVATE);
        username = sharedPreferences.getString(USER_NAME_FOR_TASK_BACKGROUND,"");
    }
    @Override
    protected void onHandleIntent(Intent intent) {



        if(intent ==null){
            Log.d("Task : ","NULL");
            for (int i =0; i<time;i++){
                Log.d("Task null : ",i+"");
                if(i==time-1){
                    i=0;
                    getLocationAndUsername();
                }
                try{
                    Thread.sleep(timeRunTask);
                }catch (Exception e){
                }
            }
        }
        Log.d("Task : ","Not NULL");
        for (int i =0; i<time;i++){
            Log.d("Task not null : ",i+"");
            if(i==time-1){
                i=0;
                getLocationAndUsername();
            }
            try{
                Thread.sleep(timeRunTask);
            }catch (Exception e){

            }
        }
    }
    public void Notification(){
        NotificationCompat.Builder nBuilder = new NotificationCompat.Builder(this);
        nBuilder.setContentText(describe);
        nBuilder.setContentTitle(tittle);
        nBuilder.setSmallIcon(R.mipmap.iconapp);
        Intent intent1 = new Intent(this, MainActivity.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(this,0,intent1,PendingIntent.FLAG_CANCEL_CURRENT);
        nBuilder.setContentIntent(pendingIntent);

        NotificationManager notificationManager =  (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
        notificationManager.notify(1, nBuilder.build());
    }
    public  void GetPromotion(){
        RequestNotification requestNotification = new RequestNotification(username,2,String.valueOf(lattitude),String.valueOf(longitude));
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("http://lbawebserver.us-east-1.elasticbeanstalk.com")
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        NotificationInterface notificationInterface = retrofit.create(NotificationInterface.class);
        Call<Notification> call = notificationInterface.getData(requestNotification);
        call.enqueue(new Callback<Notification>() {
            @Override
            public void onResponse(Call<Notification> call, Response<Notification> response) {
                ArrayList<DetailsNotification> arrayList = response.body().getData();
                Log.d("Task",response.body().getData().toString());
                if(arrayList.size()>0){
                    tittle = arrayList.get(0).getPromotion_Title();
                    describe=arrayList.get(0).getPromotion_Description();
                    Notification();
                }
                else
                    Log.d("Task Error","No Promotion Found");
            }
            @Override
            public void onFailure(Call<Notification> call, Throwable t) {
                Log.d("Task Error",t.getMessage()+"");
            }
        });
    }
}
