package com.ar_lba;



/**
 * Created by hilbert on 09/03/2018.
 */
        import android.content.SharedPreferences;

        import com.facebook.react.ReactPackage;
        import com.facebook.react.bridge.NativeModule;
        import com.facebook.react.bridge.ReactApplicationContext;
        import com.facebook.react.uimanager.ViewManager;

        import java.util.ArrayList;
        import java.util.Collections;
        import java.util.List;

class ActivityStarterReactPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new ActivityStarterModule(reactContext));
        return modules;
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}