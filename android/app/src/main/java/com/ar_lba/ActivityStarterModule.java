package com.ar_lba;

/**
 * Created by hilbert on 05/04/2018.
 */


import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

class ActivityStarterModule extends ReactContextBaseJavaModule {
    String USER_NAME="USERNAME";
    String USER_NAME_FOR_TASK_BACKGROUND="USERNAMEFORTASKBACKGROUND";

    private static DeviceEventManagerModule.RCTDeviceEventEmitter eventEmitter = null;

    ActivityStarterModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public void initialize() {
        super.initialize();
        eventEmitter = getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
    }

    /**
     * @return the name of this module. This will be the name used to {@code require()} this module
     * from JavaScript.
     */
    @Override
    public String getName() {
        return "ActivityStarter";
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("MyEventName", "MyEventValue");
        return constants;
    }

    @ReactMethod
    void navigateToExample(String Array) {
        Log.d("test: ",Array);
        Activity activity = getCurrentActivity();
        if (activity != null) {
            Intent intent = new Intent(activity, ARActivity.class);
            intent.putExtra("PROMOTION",Array);
            activity.startActivity(intent);
        }
    }
    @ReactMethod
    void asynStore(String Username) {
        Activity activity = getCurrentActivity();

        SharedPreferences sharedPreferences = activity.getSharedPreferences(USER_NAME,Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putString(USER_NAME_FOR_TASK_BACKGROUND,Username);
        editor.apply();
        Log.d("Task: ","GET OK: "+Username);
    }
}
