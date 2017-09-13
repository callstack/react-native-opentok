package com.rnopentok;

import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class RNOpenTokModule extends ReactContextBaseJavaModule {
    public static final String REACT_CLASS = "RNOpenTok";
    private static ReactApplicationContext reactContext = null;

    public RNOpenTokModule(ReactApplicationContext context) {
        super(context);

        reactContext = context;
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @ReactMethod
    public void initSession (String sessionId) {
        ApplicationInfo ai = null;
        try {
            ai = reactContext.getPackageManager().getApplicationInfo(reactContext.getPackageName(), PackageManager.GET_META_DATA);
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
        }
        String apiKey = (String)ai.metaData.get("OPENTOK_API_KEY");

        Log.d("API_KEY", apiKey);
    }

    @ReactMethod
    public void createSession (String sessionId) {

    }

    @ReactMethod
    public void connectWithToken (String token) {

    }

    @ReactMethod
    public void disconnect () {

    }
}
