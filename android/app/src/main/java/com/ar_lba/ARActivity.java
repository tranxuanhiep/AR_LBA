package com.ar_lba;

/**
 * Created by hilbert on 05/04/2018.
 */

import android.Manifest;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.hardware.Camera;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.location.Criteria;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.opengl.Matrix;
import android.os.Build;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.SurfaceView;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.jaredrummler.materialspinner.MaterialSpinner;

public class ARActivity extends AppCompatActivity implements SensorEventListener, LocationListener {

    final static String TAG = "ARActivity";
    private SurfaceView surfaceView;
    private FrameLayout cameraContainerLayout;
    private AROverlayView arOverlayView;
    private Camera camera;
    private ARCamera arCamera;
    //private TextView tvCurrentLocation;
    private Button btnFoo,btnAll,btnEnt,btnFas;

    private SensorManager sensorManager;
    private final static int REQUEST_CAMERA_PERMISSIONS_CODE = 11;
    public static final int REQUEST_LOCATION_PERMISSIONS_CODE = 0;

    private static final long MIN_DISTANCE_CHANGE_FOR_UPDATES = 0; // 10 meters
    private static final long MIN_TIME_BW_UPDATES = 0;//1000 * 60 * 1; // 1 minute

    private LocationManager locationManager;
    public Location location;
    boolean isGPSEnabled;
    boolean isNetworkEnabled;
    boolean locationServiceAvailable;
    String promotion;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ar);
        promotion = getIntent().getStringExtra("PROMOTION");
        sensorManager = (SensorManager) this.getSystemService(SENSOR_SERVICE);
        cameraContainerLayout = findViewById(R.id.camera_container_layout);
        surfaceView = findViewById(R.id.surface_view);

        MaterialSpinner spinner =  findViewById(R.id.spinner);
        spinner.setItems("All", "Food & Drink", "Fashion", "Entertainment", "Other");
        spinner.setOnItemSelectedListener(new MaterialSpinner.OnItemSelectedListener<String>() {
            @Override public void onItemSelected(MaterialSpinner view, int position, long id, String item) {
                switch (position){
                    case 0:
                        SharedPreferences.Editor editor = getSharedPreferences("TYPEOFCAMERA", MODE_PRIVATE).edit();
                        editor.putString("type", "All");
                        editor.putInt("position",position);
                        editor.apply();
                        finish();
                        startActivity(getIntent());
                        break;
                    case 1:
                        SharedPreferences.Editor editor1 = getSharedPreferences("TYPEOFCAMERA", MODE_PRIVATE).edit();
                        editor1.putString("type", "1");
                        editor1.putInt("position",position);
                        editor1.apply();
                        finish();
                        startActivity(getIntent());
                        break;
                    case 2:
                        SharedPreferences.Editor editor2 = getSharedPreferences("TYPEOFCAMERA", MODE_PRIVATE).edit();
                        editor2.putString("type", "2");
                        editor2.putInt("position",position);
                        editor2.apply();
                        finish();
                        startActivity(getIntent());
                        break;
                    case 3:
                        SharedPreferences.Editor editor3 = getSharedPreferences("TYPEOFCAMERA", MODE_PRIVATE).edit();
                        editor3.putString("type", "3");
                        editor3.putInt("position",position);
                        editor3.apply();
                        finish();
                        startActivity(getIntent());
                        break;
                    case 4:
                        SharedPreferences.Editor editor4 = getSharedPreferences("TYPEOFCAMERA", MODE_PRIVATE).edit();
                        editor4.putString("type", "4");
                        editor4.putInt("position",position);
                        editor4.apply();
                        finish();
                        startActivity(getIntent());
                        break;
                }
            }
        });

        SharedPreferences prefs = getSharedPreferences("TYPEOFCAMERA", MODE_PRIVATE);
        String typeStore = prefs.getString("type", "null");
        int position = prefs.getInt("position",0);
            switch (typeStore){
                case "All":
                    arOverlayView = new AROverlayView(this,promotion,"All");
                    spinner.setSelectedIndex(position);
                    break;
                case "1":
                    arOverlayView = new AROverlayView(this,promotion,"1");
                    spinner.setSelectedIndex(position);
                    break;
                case "2":
                    arOverlayView = new AROverlayView(this,promotion,"2");
                    spinner.setSelectedIndex(position);
                    break;
                case "3":
                    arOverlayView = new AROverlayView(this,promotion,"3");
                    spinner.setSelectedIndex(position);
                    break;
                case "4":
                    arOverlayView = new AROverlayView(this,promotion,"4");
                    spinner.setSelectedIndex(position);
                    break;
                case "null":
                    arOverlayView = new AROverlayView(this,promotion,"All");
                    spinner.setSelectedIndex(0);
                    break;
            }
        }

    @Override
    public void onResume() {
        super.onResume();
        requestLocationPermission();
        requestCameraPermission();
        registerSensors();
        initAROverlayView();
    }

    @Override
    public void onPause() {
        releaseCamera();
        super.onPause();
    }

    public void requestCameraPermission() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M &&
                this.checkSelfPermission(Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
            this.requestPermissions(new String[]{Manifest.permission.CAMERA}, REQUEST_CAMERA_PERMISSIONS_CODE);
        } else {
            initARCameraView();
        }
    }

    public void requestLocationPermission() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M &&
                this.checkSelfPermission(Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            this.requestPermissions(new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, REQUEST_LOCATION_PERMISSIONS_CODE);
        } else {
            initLocationService();
        }
    }

    public void initAROverlayView() {
        if (arOverlayView.getParent() != null) {
            ((ViewGroup) arOverlayView.getParent()).removeView(arOverlayView);
        }
        cameraContainerLayout.addView(arOverlayView);
    }

    public void initARCameraView() {
        reloadSurfaceView();

        if (arCamera == null) {
            arCamera = new ARCamera(this, surfaceView);
        }
        if (arCamera.getParent() != null) {
            ((ViewGroup) arCamera.getParent()).removeView(arCamera);
        }
        cameraContainerLayout.addView(arCamera);
        arCamera.setKeepScreenOn(true);
        initCamera();
    }

    private void initCamera() {
        int numCams = Camera.getNumberOfCameras();
        if(numCams > 0){
            try{
                camera = Camera.open();
                camera.startPreview();
                arCamera.setCamera(camera);
            } catch (RuntimeException ex){
                Toast.makeText(this, "Camera not found", Toast.LENGTH_LONG).show();
            }
        }
    }

    private void reloadSurfaceView() {
        if (surfaceView.getParent() != null) {
            ((ViewGroup) surfaceView.getParent()).removeView(surfaceView);
        }

        cameraContainerLayout.addView(surfaceView);
    }

    private void releaseCamera() {
        if(camera != null) {
            camera.setPreviewCallback(null);
            camera.stopPreview();
            arCamera.setCamera(null);
            camera.release();
            camera = null;
        }
    }

    private void registerSensors() {
        sensorManager.registerListener(this,
                sensorManager.getDefaultSensor(Sensor.TYPE_ROTATION_VECTOR),
                SensorManager.SENSOR_DELAY_FASTEST);
    }

    @Override
    public void onSensorChanged(SensorEvent sensorEvent) {
        if (sensorEvent.sensor.getType() == Sensor.TYPE_ROTATION_VECTOR) {
            float[] rotationMatrixFromVector = new float[16];
            float[] projectionMatrix = new float[16];
            float[] rotatedProjectionMatrix = new float[16];

            SensorManager.getRotationMatrixFromVector(rotationMatrixFromVector, sensorEvent.values);

            if (arCamera != null) {
                projectionMatrix = arCamera.getProjectionMatrix();
            }

            Matrix.multiplyMM(rotatedProjectionMatrix, 0, projectionMatrix, 0, rotationMatrixFromVector, 0);
            this.arOverlayView.updateRotatedProjectionMatrix(rotatedProjectionMatrix);
        }
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int i) {
        //do nothing
    }

    private void initLocationService() {

        if ( Build.VERSION.SDK_INT >= 23 &&
                ContextCompat.checkSelfPermission( this, Manifest.permission.ACCESS_FINE_LOCATION ) != PackageManager.PERMISSION_GRANTED) {
            return  ;
        }

        try   {
            this.locationManager = (LocationManager) this.getSystemService(this.LOCATION_SERVICE);

            // Get GPS and network status
            this.isGPSEnabled = locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER);
            this.isNetworkEnabled = locationManager.isProviderEnabled(LocationManager.NETWORK_PROVIDER);
            Criteria criteria = new Criteria();
            String bestProvider = locationManager.getBestProvider(criteria, false);
            location = locationManager.getLastKnownLocation(bestProvider);
            locationManager.requestLocationUpdates(bestProvider, MIN_TIME_BW_UPDATES,
                    MIN_DISTANCE_CHANGE_FOR_UPDATES,this);
            updateLatestLocation(location);
            if (!isNetworkEnabled && !isGPSEnabled)    {
                // cannot get location
                this.locationServiceAvailable = false;
            }

            this.locationServiceAvailable = true;

            if (isNetworkEnabled) {
                locationManager.requestLocationUpdates(LocationManager.NETWORK_PROVIDER,
                        MIN_TIME_BW_UPDATES,
                        MIN_DISTANCE_CHANGE_FOR_UPDATES, this);
                if (locationManager != null)   {
                    location = locationManager.getLastKnownLocation(LocationManager.NETWORK_PROVIDER);
                    updateLatestLocation(location);
                }
                updateLatestLocation(location);
            }

            if (isGPSEnabled)  {
                locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER,
                        MIN_TIME_BW_UPDATES,
                        MIN_DISTANCE_CHANGE_FOR_UPDATES, this);

                if (locationManager != null)  {
                    location = locationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER);
                    updateLatestLocation(location);
                }
                updateLatestLocation(location);
            }
        } catch (Exception ex)  {
            Log.e(TAG, ex.getMessage());
        }
    }

    private void updateLatestLocation(Location location) {
        if (arOverlayView !=null) {
            arOverlayView.updateCurrentLocation(location);
            //tvCurrentLocation.setVisibility(View.GONE);;
        }
    }

    @Override
    public void onLocationChanged(Location location) {
        updateLatestLocation(location);
    }

    @Override
    public void onStatusChanged(String s, int i, Bundle bundle) {

    }

    @Override
    public void onProviderEnabled(String s) {

    }

    @Override
    public void onProviderDisabled(String s) {

    }

}
