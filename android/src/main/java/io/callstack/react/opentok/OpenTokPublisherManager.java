package io.callstack.react.opentok;

import android.graphics.*;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.RCTNativeAppEventEmitter;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.ThemedReactContext;
import com.opentok.android.OpentokError;
import com.opentok.android.Session;
import com.opentok.android.Stream;
import com.opentok.android.Connection;

import java.util.Map;



public class OpenTokPublisherManager extends ReactContextBaseJavaModule {

    private PublisherView mPublisherView;
    private PublisherViewManager mPublisherViewManager;
    private Camera camera;

    public OpenTokPublisherManager(ReactApplicationContext reactContext, Camera camera) {
        super(reactContext);
        this.camera = camera;
    }

    @Override
    public String getName() {
        return "OpenTokPublisherManager";
    }

    @ReactMethod
    public void updateCameraPosition() {
        this.camera.onCameraChanged();
    }
}