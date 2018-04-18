package com.ar_lba;

/**
 * Created by hilbert on 05/04/2018.
 */


        import android.app.Activity;
        import android.app.Dialog;
        import android.content.Intent;
        import android.net.Uri;
        import android.support.v7.app.AlertDialog;
        import android.util.Log;
        import android.widget.Toast;

        import com.facebook.react.ReactInstanceManager;
        import com.facebook.react.ReactNativeHost;
        import com.facebook.react.bridge.Callback;
        import com.facebook.react.bridge.CatalystInstance;
        import com.facebook.react.bridge.Promise;
        import com.facebook.react.bridge.ReactApplicationContext;
        import com.facebook.react.bridge.ReactContext;
        import com.facebook.react.bridge.ReactContextBaseJavaModule;
        import com.facebook.react.bridge.ReactMethod;
        import com.facebook.react.bridge.WritableNativeArray;
        import com.facebook.react.bridge.WritableNativeMap;
        import com.facebook.react.modules.core.DeviceEventManagerModule;

        import org.json.JSONArray;
        import org.json.JSONObject;

        import java.lang.reflect.Array;
        import java.util.ArrayList;
        import java.util.HashMap;
        import java.util.Map;

        import javax.annotation.Nonnull;
        import javax.annotation.Nullable;
class ActivityStarterModule extends ReactContextBaseJavaModule {

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
}
